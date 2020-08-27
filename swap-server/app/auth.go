package app

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

// A UserAuthenticator verifies that the user is registered with our app.
type UserAuthenticator struct {
	authClient *auth.Client
}

// NewUserAuthenticator creates an Authenticator struct.
func NewUserAuthenticator(ctx context.Context) *UserAuthenticator {
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}
	return &UserAuthenticator{
		authClient: client,
	}
}

// VerifyIDToken returns true is user is authenticated and false otherwise.
func (userAuth *UserAuthenticator) VerifyIDToken(ctx context.Context, idToken string) (*auth.Token, error) {
	return userAuth.authClient.VerifyIDToken(ctx, idToken)
}

// GetUser returns user info from Firebase into a User and returns an error if there is an error with Firebase client.
func (userAuth *UserAuthenticator) GetUser(ctx context.Context, id string) (*User, error) {
	authRecord, err := userAuth.authClient.GetUser(ctx, id)
	if err != nil {
		return nil, err
	}
	user := User{
		ID:             id,
		FullName:       authRecord.DisplayName,
		DisplayName:    authRecord.DisplayName,
		Description:    "",
		ProfilePicture: authRecord.PhotoURL,
	}
	return &user, nil
}
