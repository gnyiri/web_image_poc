package image_repository

import (
	"io/ioutil"
	"log"
	"path"

	"github.com/gnyiri/web_image_poc/config"
)

type ImageRepository struct {
	config *config.Config
}

func NewImageRepository(config *config.Config) *ImageRepository {
	return &ImageRepository{config: config}
}

func (i *ImageRepository) GetImages() ([]ImageEntity, error) {
	files, err := ioutil.ReadDir(path.Join(i.config.WWWRoot, i.config.ImageRepositoryPath))

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	var images []ImageEntity

	for _, file := range files {
		if !file.IsDir() {
			images = append(images,
				ImageEntity{
					file.Name(),
					path.Join(i.config.WWWRoot, i.config.ImageRepositoryPath, file.Name()),
					int(file.ModTime().UnixMilli())})
		}
	}

	return images, nil
}
