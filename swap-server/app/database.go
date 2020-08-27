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
		Columns: []string{"id", "display_name", "full_name", "description", "profile_picture"},
		PartKey: []string{"id"},
		SortKey: []string{},
	})
	return &Database{
		currentSession: &session,
		userTable:      userTable,
	}
}
