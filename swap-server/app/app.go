package app

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// An App represents all the objects used by this server app.
type App struct {
	groups   *[]Group
	chats    *[]Chat
	messages *[]Message
	r        *mux.Router
}

// NewApp creates a new instance of this server app.NewApp
func NewApp() *App {
	newStudentsArr := make([]Group, 0)
	return &App{
		groups: &newStudentsArr,
		r:      mux.NewRouter(),
	}
}

// Start runs the app.
func (a *App) Start() {
	a.r.HandleFunc("/groups", a.getAllGroups).Methods("GET")
	a.r.HandleFunc("/groups", a.createGroup).Methods("POST")
	a.r.PathPrefix("/").Handler(http.FileServer(http.Dir("./web")))
	log.Fatal(http.ListenAndServe(":8080", a.r))
}

func (a *App) getAllGroups(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(a.groups)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
	}
}

func (a *App) createGroup(w http.ResponseWriter, r *http.Request) {
	var g Group
	err := json.NewDecoder(r.Body).Decode(&g)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	newGroups := append(*a.groups, g)
	a.groups = &newGroups
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}
