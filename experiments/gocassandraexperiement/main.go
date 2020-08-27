package main

import (
	"log"

	"github.com/gocql/gocql"
)

func main() {
	cluster := gocql.NewCluster("localhost:9042")
	cluster.Keyspace = "test01"
	cluster.Consistency = gocql.Quorum
	session, err := cluster.CreateSession()
	defer session.Close()
	if err != nil {
		log.Fatal(err)
	}

	// insert
	// if err := session.Query(`INSERT INTO countries (id, official_name, capital_city) VALUES (?, ?, ?)`,
	// 	2, "United States", "Washington D.C").Exec(); err != nil {
	// 	log.Fatal(err)
	// }

	// query one
	// var id int
	// var officialName string

	// if err := session.Query(`SELECT id, official_name FROM countries WHERE capital_city = ? LIMIT 1`,
	// 	"Washington D.C.").Consistency(gocql.One).Scan(&id, &officialName); err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Country:", id, officialName)

	// query multiple
	// var id int
	// var officialName string
	// var capitalCity string
	// iter := session.Query(`SELECT id, official_name, capital_city FROM countries`).Iter()
	// for iter.Scan(&id, &officialName, &capitalCity) {
	// 	fmt.Println("Country:", id, officialName, capitalCity)
	// }
	// if err := iter.Close(); err != nil {
	// 	log.Fatal(err)
	// }
}
