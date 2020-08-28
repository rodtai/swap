package app

import (
	"log"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
)

// Database abstracts any inserting, querying, updating, and deleting we need.
type Database struct {
	currentSession *gocqlx.Session
	userTable      *table.Table
	groupTable     *table.Table
	userGroupTable *table.Table // stores the all the groups under a particular user.
}

// NewDatabase creates a reference to our cluster and current session.
func NewDatabase() *Database {
	cluster := gocql.NewCluster("localhost:9042")
	cluster.Keyspace = "swap"
	cluster.Consistency = gocql.Quorum
	session, err := gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		log.Fatal(err)
	}
	userTable := table.New(table.Metadata{
		Name:    "user",
		Columns: []string{"id", "display_name", "full_name", "description", "profile_picture", "num_groups"},
		PartKey: []string{"id"},
		SortKey: []string{},
	})
	groupTable := table.New(table.Metadata{
		Name:    "group",
		Columns: []string{"id", "admin_id", "group_icon", "name"},
		PartKey: []string{"id"},
		SortKey: []string{},
	})
	userGroupTable := table.New(table.Metadata{
		Name:    "usergroup",
		Columns: []string{"user_id", "group_id", "group_idx"},
		PartKey: []string{"user_id"},
		SortKey: []string{"group_idx", "group_id"},
	})
	return &Database{
		currentSession: &session,
		userTable:      userTable,
		groupTable:     groupTable,
		userGroupTable: userGroupTable,
	}
}
