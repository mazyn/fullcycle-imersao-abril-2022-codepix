package main

import (
	"github.com/jinzhu/gorm"
	"github.com/mazyn/fullcycle-imersao-abril-2022-codepix/codepix/application/grpc"
	"github.com/mazyn/fullcycle-imersao-abril-2022-codepix/codepix/infrastructure/db"
	"os"
)

var database *gorm.DB

func main() {
	database = db.ConnectDB(os.Getenv("env"))
	grpc.StartGrpcServer(database, 50051)
}
