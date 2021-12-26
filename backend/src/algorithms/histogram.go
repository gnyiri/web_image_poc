package algorithms

import (
	"image"
)

type Histogram struct {
	InputImage *image.RGBA
}

func (histogram *Histogram) Execute() (uint32, uint32, [256]uint32) {
	size := histogram.InputImage.Bounds().Size()
	var values [256]uint32
	var min uint32 = 255
	var max uint32 = 0

	for y := 0; y < size.Y; y++ {
		for x := 0; x < size.X; x++ {
			value := histogram.InputImage.At(x, y)
			r, g, b, _ := value.RGBA()
			greyValue := (19595*r + 38470*g + 7471*b + 1<<15) >> 24

			if greyValue < min {
				min = greyValue
			}
			if greyValue > max {
				max = greyValue
			}

			values[greyValue] = values[greyValue] + 1
		}
	}

	return min, max, values
}
