import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/Models/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'User',
            schema: UserSchema
        }
    ])
    ],
    controllers: [],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class SharedModule {}