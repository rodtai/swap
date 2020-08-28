package app

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// An App represents all the objects used by this server app.
type App struct {
	router   *mux.Router
	database *Database
	userAuth *UserAuthenticator
}

// NewApp creates a new instance of this server app.NewApp
func NewApp() *App {
	return &App{
		router:   mux.NewRouter(),
		database: NewDatabase(),
		userAuth: NewUserAuthenticator(context.Background()),
	}
}

// Start runs the app.
func (app *App) Start(port int) {
	fmt.Println("Running on localhost:" + strconv.Itoa(port))
	apiRouter := app.router.PathPrefix("/api").Subrouter()
	apiRouter.Use(app.UserAuthentication)
	apiRouter.HandleFunc("/profile", app.GetCurrentUser).Methods("GET")
	apiRouter.HandleFunc("/profile", app.PostNewUser).Methods("POST")
	apiRouter.HandleFunc("/groups", app.PostNewGroup).Methods("POST")
	apiRouter.HandleFunc("/groups", app.GetGroups).Methods("GET")
	app.router.PathPrefix("/").Handler(http.FileServer(http.Dir("./web")))
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(port), app.router))
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}
