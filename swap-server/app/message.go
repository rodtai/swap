package app

import "time"

// A Message represents a piece of text or an image posted by a user in a specific chat.
type Message struct {
	ID        string
	UserID    string
	Content   string
	Type      string
	Timestamp time.Time
	ChatID    string
}
