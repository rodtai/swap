package app

import (
	"encoding/json"
	"net/http"

	"github.com/gocql/gocql"
)

// A User represents an authenticated Firebase user.
type User struct {
	ID             string `json:"id"`
	FullName       string `json:"name"`
	DisplayName    string `json:"displayName"`
	Description    string `json:"description"`
	ProfilePicture string `json:"profilePicture"`
}

// GetCurrentUser gets the current user's data.
func (app *App) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	userID, _ := r.Context().Value(UserUID).(string)
	user, err := app.database.SelectUserByID(userID)
	if err != nil {
		if err.Error() == gocql.ErrNotFound.Error() {
			firebaseUser, firebaseErr := app.userAuth.GetUser(r.Context(), userID)
			if firebaseErr != nil {
				sendErr(w, http.StatusInternalServerError, firebaseErr.Error())
				return
			}
			user = firebaseUser
		} else {
			sendErr(w, http.StatusInternalServerError, err.Error())
			return
		}
	}
	json.NewEncoder(w).Encode(user)
}

// PostNewUser gets the user's body request and creates a new user.
func (app *App) PostNewUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	user.ID = r.Context().Value(UserUID).(string)
	if err := app.database.InsertUser(user); err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	if err := json.NewEncoder(w).Encode(user); err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	json.NewEncoder(w).Encode(user)
}

// InsertUser creates a new user from a Firebase UUID.
func (db *Database) InsertUser(user User) error {
	query := db.currentSession.Query(db.userTable.Insert()).BindStruct(user)
	if err := query.ExecRelease(); err != nil {
		return err
	}
	return nil
}

// SelectUserByID returns a *User by its id and returns an error if the query fails.
func (db *Database) SelectUserByID(id string) (*User, error) {
	user := User{
		ID:             id,
		FullName:       "",
		DisplayName:    "",
		Description:    "",
		ProfilePicture: "",
	}
	query := db.currentSession.Query(db.userTable.Get()).BindStruct(user)
	if err := query.GetRelease(&user); err != nil {
		return &user, err
	}
	return &user, nil
}
