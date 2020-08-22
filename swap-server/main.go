package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"golang.org/x/net/context"

	firebase "firebase.google.com/go"
)

func hello(w http.ResponseWriter, req *http.Request) {
	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		fmt.Fprintln(w, "error initializing app: "+err.Error())
		return
	}
	client, err := app.Auth(context.Background())
	if err != nil {
		fmt.Fprintln(w, "error getting Auth client: "+err.Error())
		return
	}

	token, err := client.VerifyIDToken(context.Background(), "sdfsdfs")
	if err != nil {
		fmt.Fprintln(w, "error verifying ID token: "+err.Error())
		return
	}

	fmt.Fprintln(w, "Verified ID token: "+token.UID)

	fmt.Fprintln(w, "Hello")
}

func main() {
	temp := make([]*student, 0)
	app := App{
		students: &temp,
		r:        mux.NewRouter(),
	}
	app.start()
}
