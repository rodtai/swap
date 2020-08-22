package models

// A UserGroup represents a connection between a user and group
// and is represented using a many-to-many relationship.
type UserGroup struct {
	ID      string // primary key, useless otherwise
	UserID  string
	GroupID string
}
