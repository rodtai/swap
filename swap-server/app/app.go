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
	// app.router.HandleFunc("/groups", app.getAllGroups).Methods("GET")
	apiRouter := app.router.PathPrefix("/api").Subrouter()
	apiRouter.Use(app.UserAuthentication)
	apiRouter.HandleFunc("/dummy", app.Dummy)
	apiRouter.HandleFunc("/profile", app.GetCurrentUser).Methods("GET")
	app.router.PathPrefix("/").Handler(http.FileServer(http.Dir("./web")))
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(port), app.router))
}

// A DummyMessage contains text content.
type DummyMessage struct {
	Content string
}

// Dummy send a Hello string. This is mostly for debugging.
func (app *App) Dummy(w http.ResponseWriter, r *http.Request) {
	mes := DummyMessage{
		Content: "Rodrigo",
	}
	if err := json.NewEncoder(w).Encode(mes); err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
	}
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}
