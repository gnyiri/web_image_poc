package image_io

import (
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"os"
	"path"
)

func LoadRGBAImage(imagePath string) (*image.RGBA, error) {
	var inputImageFile *os.File
	var err error

	inputImageFile, err = os.Open(imagePath)

	if err != nil {
		return nil, err
	}

	defer inputImageFile.Close()

	var inputImageData image.Image
	e := path.Ext(imagePath)

	switch e {
	case ".png":
		inputImageData, err = png.Decode(inputImageFile)

		if err != nil {
			return nil, image.ErrFormat
		}
	case ".jpg":
		inputImageData, err = jpeg.Decode(inputImageFile)

		if err != nil {
			return nil, image.ErrFormat
		}
	default:
		return nil, image.ErrFormat
	}

	var rawImageData *image.RGBA

	if dst, ok := inputImageData.(*image.RGBA); ok {
		rawImageData = dst
	} else {
		b := inputImageData.Bounds()
		rawImageData = image.NewRGBA(image.Rect(0, 0, b.Dx(), b.Dy()))
		draw.Draw(rawImageData, rawImageData.Bounds(), inputImageData, b.Min, draw.Src)
	}

	return rawImageData, nil
}

func SaveRGBAImage(imagePath string, imageData *image.RGBA) error {
	f, err := os.Create(imagePath)

	if err != nil {
		return err
	}
	defer f.Close()

	err = png.Encode(f, imageData)

	if err != nil {
		return err
	}

	return nil
}

func SaveGrayImage(imagePath string, imageData *image.Gray) error {
	f, err := os.Create(imagePath)

	if err != nil {
		return err
	}
	defer f.Close()

	err = png.Encode(f, imageData)

	if err != nil {
		return err
	}

	return nil
}
