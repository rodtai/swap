package app

// An Image represents a picture for various uses (profile picture, group icon, images in messages, etc).
type Image struct {
	ID      string
	Content string // for now it can be a url-encoded image
}
