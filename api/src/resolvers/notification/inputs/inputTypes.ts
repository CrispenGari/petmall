import { Field, InputType } from "type-graphql";


@InputType()
export class NewNotificationSubscriptionInput{
    @Field(()=>String)
    userId: string
}

@InputType()
export class MarkNotificationAsReadInputType{
    @Field(()=>String)
    id: string
}
