import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        uploadBtn: {
            display: 'inline-block',
            width: 120,
            height: 30,
            lineHeight: '30px',
            border: '1px solid',
            borderRadius: '3px',
            cursor: 'pointer',
            textAlign: 'center',
        },
        imgDiv: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '300px',
            height: '250px',
            backgroundColor: '#d3d3d3',
            border: '1px solid black',
            position: 'relative'
        },
    }),
);

const ImageUploader = forwardRef((props, ref ) => {
    const classes = useStyles();

    useImperativeHandle(ref, () => {
        return {
            imageFile: image,
        };
    });
    const { accept, defaultImage } = props;

    const [image, setImage] = useState([]);
    const [previewImg, setPreviewImg] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    useEffect(() => {
        setPreviewImg(defaultImage);
    }, []);

    const handleFileUpload = (event) => {
        if(event.target.files[0].size < (10*1024*1024)){
            setImage([...event.target.files]);
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
        }
        else{
            alert("10 MB이상의 이미지를 올릴 수 없습니다. " + "현재 : " + {0: event.target.files[0].size});
        }

        event.target.value="";
    };


    const fileInfo = Array.from(image).map((f, index) => {
        return (
            <span key={index}>
                {f.name}
                <button
                    id={`${index}`}
                    className="btn-outlined btn-small"
                    onClick={(e) => {
                        setImage([]);
                        setPreviewImg(defaultImage);
                    }}
                >
                    삭제
                </button>
            </span>
        );
    });

    const onImageLoad = ({target:img}) => {
        if(img.offsetHeight > 250 ||img.offsetWidth > 300){
            if(img.offsetHeight-250 > img.offsetWidth - 300){
                setHeight(`250 px`);
                setWidth('auto');
            }
            else{
                setHeight('auto');
                setWidth(`300 px`);
            }
        }
    }


    return (
        <>
            <label htmlFor="image-upload" className={classes.uploadBtn}>
            이미지 업로드
            </label>
            <input
                id="image-upload"
                type="file"
                accept={accept && accept.join(', ')}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            <span>{fileInfo}</span>
            <div className={classes.imgDiv}>
                <img src={previewImg} onLoad={onImageLoad} width={width} height={height}
                style={{display: 'inline', position: 'absolute',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                padding: '2px'
                }}/>
            </div>

        </>
    );
});

export default ImageUploader;
