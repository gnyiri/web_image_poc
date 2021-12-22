package algorithms

import (
	"image"
	"image/color"
)

type Threshold struct {
	InputImage     *image.RGBA
	ThresholdValue int
}

func (threshold *Threshold) Execute() *image.Gray {
	size := threshold.InputImage.Bounds().Size()
	outputImage := image.NewGray(threshold.InputImage.Bounds())

	for y := 0; y < size.Y; y++ {
		for x := 0; x < size.X; x++ {
			value := threshold.InputImage.At(x, y)
			r, g, b, _ := value.RGBA()
			greyValue := (19595*r + 38470*g + 7471*b + 1<<15) >> 24

			if int(greyValue) < threshold.ThresholdValue {
				color := color.Gray{uint8(0)}
				outputImage.Set(x, y, color)
			} else {
				color := color.Gray{uint8(255)}
				outputImage.Set(x, y, color)
			}
		}
	}

	return outputImage
}
