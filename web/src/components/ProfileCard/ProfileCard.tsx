import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";

import { Button, Icon, Input, Form, Card, Message } from "semantic-ui-react";
import { setUser } from "../../actions";
import { COLORS, PETS_CATEGORIES, TOKEN_KEY } from "../../constants";
import {
  useGetUserQuery,
  useUpdateProfileAvatarMutation,
  useUpdateUserInfoMutation,
} from "../../graphql/generated/graphql";

import { ErrorType, StateType } from "../../types";
import { store } from "../../utils";

import "./ProfileCard.css";

interface Props {
  userId: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const ProfileCard: React.FC<Props> = ({
  userId: id,
  category,
  setCategory,
}) => {
  const { user: me } = useSelector((state: StateType) => state);
  const [
    { fetching: updatingAvatar, data: updatedAvatarResult },
    updateAvatar,
  ] = useUpdateProfileAvatarMutation();
  const [{ fetching: updatingInfo, data: updatedUserInfo }, updateUserInfo] =
    useUpdateUserInfoMutation();
  const [{ data, fetching }, refetchUser] = useGetUserQuery({
    variables: { input: { id } },
  });
  const [{ email, image, firstName, lastName }, setForm] = React.useState<{
    email: string;
    image: any;
    firstName: string;
    lastName: string;
  }>({
    image: null,
    email: "",
    firstName: "",
    lastName: "",
  });
  const [readonly, setReadonly] = React.useState<boolean>(true);
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [previewImage, setPreviewImage] = React.useState("");
  const [enableEdit, setEnableEdit] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user) {
      const { firstName, lastName, email } = data.user;
      setForm((state) => ({ ...state, email, firstName, lastName }));
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

  const updateProfileAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!image) {
      setPreviewImage(me?.avatar || "");
      return;
    }
    await updateAvatar({ input: { avatar: image } });
    setPreviewImage(me?.avatar || "");
  };

  const handleChange = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      setPreviewImage(reader.result as any);
    };
    reader.readAsDataURL(file);
    setForm((state) => ({ ...state, image: file }));
  };

  const updateProfileInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserInfo({ input: { email, firstName, lastName } });
    setEnableEdit(false);
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updatedUserInfo?.updateUserInfo) {
      if (updatedUserInfo.updateUserInfo.error) {
        setError(updatedUserInfo.updateUserInfo.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [updatedUserInfo]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updatedUserInfo?.updateUserInfo.jwt) {
      (async () => {
        const value = await store(
          TOKEN_KEY,
          updatedUserInfo.updateUserInfo.jwt as any
        );
        if (value) {
          dispatch(setUser(updatedUserInfo.updateUserInfo.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [updatedUserInfo, dispatch]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!updatedAvatarResult?.updateAvatar) {
        (async () => {
          await refetchUser();
        })();
      }
    }
    return () => {
      mounted = false;
    };
  }, [updatedAvatarResult, refetchUser]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!me) {
      setPreviewImage(me.avatar || "");
    }
    return () => {
      mounted = false;
    };
  }, [me]);

  return (
    <div className="profile__card">
      <Form
        className="profile__card__image"
        loading={fetching || updatingAvatar}
        onSubmit={updateProfileAvatar}
      >
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
                setPreviewImage(me?.avatar || "");
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
              type="submit"
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
        loading={fetching || updatingInfo}
        onSubmit={updateProfileInfo}
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
        <div className="profile__card__info__inputs">
          <Input
            fluid
            className={"profile__card__info__input"}
            iconPosition="left"
            type={"text"}
            onChange={onChange}
            placeholder="first name(s)"
            icon={<Icon name="user" />}
            key={"firstName"}
            value={firstName}
            name="firstName"
            error={error?.field === "firstName"}
            disabled={!enableEdit}
          />
          <Input
            fluid
            className={"profile__card__info__input"}
            iconPosition="left"
            type={"text"}
            onChange={onChange}
            placeholder="last name"
            icon={<Icon name="user" />}
            key={"lastName"}
            value={lastName}
            name="lastName"
            error={error?.field === "lastName"}
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
            <Button secondary type="submit">
              update
            </Button>
          </div>
        )}
        <Card fluid className="profile__card__summary">
          <h1>Pet Market Summary</h1>
          <Card.Content extra className="profile__card__pet__summary">
            {PETS_CATEGORIES.map((cate) => (
              <div
                key={cate}
                style={{
                  color: cate === category ? COLORS.tertiary : COLORS.white,
                }}
                className="profile__card__pet__category"
                onClick={() => setCategory(cate)}
              >
                <Icon name="paw" />
                {data?.user.pets
                  ? data.user.pets.filter((pet) => pet.category === cate).length
                  : 0}{" "}
                {cate.replace(/_/g, " ")}
              </div>
            ))}
          </Card.Content>
        </Card>{" "}
        <p>{data?.user.pets!.length ?? 0} total pets in the market</p>
      </Form>
    </div>
  );
};

export default ProfileCard;
