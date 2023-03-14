import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";

import { Button, Icon, Input, Form, Card, Message } from "semantic-ui-react";
import { COLORS, PETS_CATEGORIES } from "../../constants";
import { useGetUserQuery } from "../../graphql/generated/graphql";

import { ErrorType, StateType } from "../../types";

import "./ProfileCard.css";

interface Props {
  userId: string;
}
const ProfileCard: React.FC<Props> = ({ userId: id }) => {
  const { user: me } = useSelector((state: StateType) => state);
  const [{ data, fetching }] = useGetUserQuery({
    variables: { input: { id } },
  });
  const [{ email, image }, setForm] = React.useState<{
    email: string;
    image: any;
  }>({
    image: null,
    email: "",
  });
  const [readonly, setReadonly] = React.useState<boolean>(true);
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [previewImage, setPreviewImage] = React.useState("");
  const [enableEdit, setEnableEdit] = React.useState<boolean>(false);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user.avatar) {
      setPreviewImage(data.user.avatar || "");
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user) {
      setForm((state) => ({ ...state, email: data.user.email }));
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user.id && !!me) {
      setReadonly(data.user.id !== me.id);
    }
    return () => {
      mounted = false;
    };
  }, [data, me]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const updateProfileAvatar = async () => {};

  const handleChange = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      setPreviewImage(reader.result as any);
    };
    reader.readAsDataURL(file);
    setForm((state) => ({ ...state, image: file }));
  };

  const updateProfileInfo = async () => {};
  return (
    <div className="profile__card">
      <Form className="profile__card__image">
        <img src={previewImage ? previewImage : "/profile.png"} alt="profile" />
        {readonly ? (
          <></>
        ) : previewImage?.startsWith("data:image/") ? (
          <>
            <FileUploader
              handleChange={(file: any) => handleChange(file)}
              name="file"
              types={["jpeg", "png", "jpg", "webp", "gif"]}
              multiple={false}
              children={
                <Button
                  secondary
                  fluid
                  type="button"
                  style={{
                    marginBottom: 5,
                    backgroundColor: COLORS.secondary,
                  }}
                >
                  RE-SELECT
                </Button>
              }
            />
            <Button
              secondary
              fluid
              type="button"
              onClick={() => {
                setPreviewImage(data?.user.avatar || "");
              }}
              style={{
                marginBottom: 5,
                backgroundColor: COLORS.secondary,
              }}
            >
              RESTORE
            </Button>
            <Button
              primary
              fluid
              type="button"
              onClick={updateProfileAvatar}
              style={{ backgroundColor: COLORS.primary }}
            >
              UPDATE
            </Button>
          </>
        ) : (
          <FileUploader
            handleChange={(file: any) => handleChange(file)}
            name="file"
            types={["jpeg", "png", "jpg", "webp", "gif"]}
            multiple={false}
            children={
              <Button
                primary
                fluid
                type="button"
                style={{
                  marginBottom: 5,
                  backgroundColor: COLORS.primary,
                }}
              >
                SELECT
              </Button>
            }
          />
        )}
      </Form>
      <Form
        //   loading={loading}
        //   onSubmit={onSubmit}
        className="profile__card__info"
      >
        <h1>Profile</h1>
        <div className="profile__card__info__inputs">
          <Input
            iconPosition="left"
            type={"email"}
            placeholder="email@domain.com"
            name="email"
            value={email}
            error={error?.field === "email"}
            onChange={onChange}
            icon={<Icon name="at" />}
            className="profile__card__info__input"
            fluid
            disabled={!enableEdit}
          />
        </div>
        {error?.message && (
          <Message negative>
            <p>{error ? error.message : ""}</p>
          </Message>
        )}
        {!readonly && (
          <div className="profile__card__info__buttons">
            <Button
              primary
              type="button"
              onClick={() => {
                setEnableEdit((state) => !state);
              }}
            >
              {enableEdit ? "done" : "edit"}
            </Button>
            <Button secondary onClick={updateProfileInfo}>
              update
            </Button>
          </div>
        )}
        <Card fluid className="profile__card__summary">
          <h1>Pet Market Summary</h1>
          <Card.Content extra className="profile__card__pet__summary">
            {PETS_CATEGORIES.map((category) => (
              <div key={category} className="profile__card__pet__category">
                <Icon name="paw" />
                {
                  data?.user.pets.filter((pet) => pet.category === category)
                    .length
                }{" "}
                {category.replace(/_/g, "")}
              </div>
            ))}
          </Card.Content>
        </Card>{" "}
        <p>{data?.user.pets.length ?? 0} total pets in the market</p>
      </Form>
    </div>
  );
};

export default ProfileCard;
