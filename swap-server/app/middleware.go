package app

import (
	"context"
	"fmt"
	"net/http"
	"strings"
)

type key int

// UserUID is the key in the UserAuthentication middleware
const (
	UserUID key = iota
)

// UserAuthentication authenticates user and adds its UID to the context
func (app *App) UserAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(authHeader) != 2 {
			fmt.Println("Malformed token")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Malformed Token"))
		} else {
			jwtToken := authHeader[1]
			token, err := app.userAuth.VerifyIDToken(context.Background(), jwtToken)
			if err == nil {
				fmt.Println(token.UID)
				ctx := context.WithValue(context.Background(), UserUID, token.Subject)
				next.ServeHTTP(w, r.WithContext(ctx))
			} else {
				fmt.Println(err)
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Unauthorized"))
			}
		}
	})
}

// GroupAuthentication authenticates the user's permission to access a particular group.
func (app *App) GroupAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}

// ChatAuthentication authenticates the user's permission to access a particular chat.
func (app *App) ChatAuthentication(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}
