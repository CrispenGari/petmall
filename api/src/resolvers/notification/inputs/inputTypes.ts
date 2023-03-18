import { Field, InputType } from "type-graphql";


@InputType()
export class NewNotificationSubscriptionInput{
    @Field(()=>String)
    userId: string
}
