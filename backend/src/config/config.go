package config

import "fmt"

type Config struct {
	ServerPort          int
	WWWRoot             string
	ImageRepositoryPath string
}

func NewConfig(sp int, wr string, irp string) *Config {
	return &Config{sp, wr, irp}
}

func (c *Config) String() string {
	return fmt.Sprintf("port: %d, wwwroot: %s, image repository path: %s", c.ServerPort, c.WWWRoot, c.ImageRepositoryPath)
}
