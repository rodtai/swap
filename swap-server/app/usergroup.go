package app

import "github.com/scylladb/gocqlx/qb"

// A UserGroup represents a relationship between a user and group
// and is represented using a many-to-many relationship.
type UserGroup struct {
	GroupIdx int // the order in which in the groups appear on the client
	UserID   string
	GroupID  string
}

// InsertNewUserGroup creates a user-group relationship to the database.
func (db *Database) InsertNewUserGroup(userGroup UserGroup) error {
	query := db.currentSession.Query(db.userGroupTable.Insert()).BindStruct(userGroup)
	if err := query.ExecRelease(); err != nil {
		return err
	}
	return nil
}

// SelectUserGroupsByUserID selects all the user groups relationships that belong to a user.
func (db *Database) SelectUserGroupsByUserID(userID string) (*[]UserGroup, error) {
	var userGroups []UserGroup
	query := db.currentSession.Query(db.userGroupTable.Select()).BindMap(qb.M{"user_id": userID})
	err := query.SelectRelease(&userGroups)
	return &userGroups, err
}
