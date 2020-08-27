package main

import (
	"fmt"

	"swap.com/swap/swap-server/app"
)

func main() {
	fmt.Println("Server starting...")
	app := app.NewApp()
	app.Start(8080)
}
