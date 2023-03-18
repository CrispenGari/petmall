import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import {
  Input,
  Icon,
  Message,
  Button,
  Form,
  TextArea,
  Select,
  Checkbox,
} from "semantic-ui-react";
import { Header } from "../../../components";
import { COLORS, GENDERS, PETS_CATEGORIES } from "../../../constants";
import { useGeolocation } from "../../../hooks";
import { ErrorType, StateType } from "../../../types";
import "./EditPet.css";
import { useSelector } from "react-redux";
import {
  useDeletePetMutation,
  useGetPetByIdQuery,
  useUpdatePetMutation,
} from "../../../graphql/generated/graphql";
import { decodeId, encodeId } from "../../../utils";
interface Props {}

const EditPet: React.FC<Props> = () => {
  const { coords } = useGeolocation();
  const params = useParams();
  const petId = decodeId(params.petId || "");
  const [{ fetching: updating, data: updateData }, updatePet] =
    useUpdatePetMutation();
  const [{ fetching: deleting, data: deleteData }, deletePet] =
    useDeletePetMutation();

  const [{ data, fetching }] = useGetPetByIdQuery({
    variables: { input: { id: petId } },
  });
  const { user } = useSelector((state: StateType) => state);
  const navigator = useNavigate();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updateData) {
      if (!!updateData?.update?.success) {
        navigator(`/app/pet/${encodeId(petId)}`, {
          replace: true,
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [updateData, navigator, petId]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!deleteData) {
      if (!!deleteData?.deletePet?.success) {
        navigator(`/`, { replace: true });
      }
    }
    return () => {
      mounted = false;
    };
  }, [deleteData, navigator]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, user]);
  const [
    { name, age, price, description, gender, category, enableLocation, image },
    setForm,
  ] = React.useState<{
    name: string;
    age: number;
    price: number;
    description: string;
    gender: string;
    category: string;
    image: any;
    enableLocation: boolean;
  }>({
    image: null,
    name: "",
    age: 1,
    price: 0.0,
    description: "",
    gender: GENDERS[0],
    category: PETS_CATEGORIES[0],
    enableLocation: false,
  });

  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const [previewImage, setPreviewImage] = React.useState("");
  const fileUploaderRef = useRef();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.getPetById?.pet) {
      const {
        price,
        age,
        image,
        category,
        description,
        gender,
        name,
        location,
      } = data?.getPetById?.pet;
      setForm((state) => ({
        ...state,
        price,
        age,
        category,
        description,
        gender,
        image: null,
        name,
        enableLocation: !!!location
          ? false
          : location.lat !== 0 && location.lon !== 0,
      }));
      setPreviewImage(image);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const deletePetHandler = async () => {
    await deletePet({ input: { id: petId } });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!name.trim()) {
      setError({ field: "name", message: "Pet Name is required!!" });
      return;
    }
    if (!!!gender) {
      setError({ field: "gender", message: "Pet Gender is required!!" });
      return;
    }
    if (!!!age) {
      setError({ field: "age", message: "Pet Age is required!!" });
      return;
    }
    if (!!!price) {
      setError({ field: "price", message: "Pet Price is required!!" });
      return;
    }
    if (!!!category) {
      setError({ field: "category", message: "Pet Category is required!!" });
      return;
    }
    if (description.trim().length < 10) {
      setError({
        field: "description",
        message: "Pet Description must be at least 10 characters long.",
      });
      return;
    }
    setError({
      field: "",
      message: "",
    });
    await updatePet({
      input: {
        id: petId,
        age: Number(age.toString()),
        category,
        gender,
        description,
        image,
        name: name.trim(),
        price: Number.parseFloat(price.toString()),
        location:
          enableLocation && !!coords
            ? {
                lat: coords.latitude,
                lon: coords.longitude,
              }
            : null,
      },
    });
  };
  return (
    <div className="edit__pet">
      <Header />
      <div className="edit__pet__form">
        <h1>EDIT PET</h1>
        <Form
          loading={fetching || deleting || updating}
          className={"edit__pet__form"}
          onSubmit={onSubmit}
        >
          <Input
            fluid
            className={"edit__pet__form__input"}
            iconPosition="left"
            type={"text"}
            onChange={onChange}
            placeholder="Pet Name"
            icon={<Icon name="paw" />}
            key={"name"}
            value={name}
            name="name"
            error={error?.field === "name"}
          />
          <Input
            fluid
            className={"edit__pet__form__input"}
            iconPosition="left"
            type={"number"}
            onChange={onChange}
            placeholder="Pet Age (in weeks)"
            icon={<Icon name="male" />}
            key={"age"}
            value={age}
            name="age"
            error={error?.field === "age"}
          />
          <Input
            fluid
            className={"edit__pet__form__input"}
            iconPosition="left"
            type={"number"}
            onChange={onChange}
            placeholder="Pet Price"
            icon={<Icon name="dollar sign" />}
            key={"price"}
            value={price}
            pattern="^\d*(\.\d{0,2})?$"
            name="price"
            error={error?.field === "price"}
          />
          <TextArea
            placeholder="Tell us more about your pet"
            fluid
            className={"edit__pet__form__input"}
            onChange={(e) =>
              setForm((state) => ({
                ...state,
                description: e.target.value,
              }))
            }
            key={"description"}
            value={description}
            name="description"
            error={error?.field === "description"}
          />
          <Select
            className={"edit__pet__form__input"}
            placeholder="Select Pet Gender"
            options={GENDERS.map((gender) => ({
              key: gender,
              value: gender,
              text: gender,
            }))}
            value={gender}
            onChange={(e, { value }) =>
              setForm((state) => ({ ...state, gender: value as string }))
            }
            fluid
          />
          <Select
            className={"edit__pet__form__input"}
            fluid
            placeholder="Select Pet Category"
            options={PETS_CATEGORIES.map((category) => ({
              key: category,
              value: category,
              text: category.replace(/_/g, " "),
            }))}
            value={category}
            onChange={(e, { value }) =>
              setForm((state) => ({ ...state, category: value as string }))
            }
          />

          {!!previewImage ? (
            <div className="edit__pet__preview__image">
              <img src={previewImage} alt="pet" />
            </div>
          ) : null}
          <FileUploader
            handleChange={(file: any) => {
              const reader = new FileReader();
              reader.onloadend = function () {
                setPreviewImage(reader.result as any);
              };
              reader.readAsDataURL(file);
              setForm((state) => ({ ...state, image: file }));
            }}
            name="file"
            types={["jpeg", "png", "jpg", "webp", "gif"]}
            className="edit__pet__form__input"
            ref={fileUploaderRef}
            children={
              !!!previewImage ? (
                <p className="edit__pet__form__dragzone">
                  Select an image of a PET or drag and drop.
                </p>
              ) : (
                <p className="edit__pet__form__dragzone">
                  Re-select an image of a PET or drag and drop.
                </p>
              )
            }
          />
          <Checkbox
            className={"edit__pet__form__input"}
            checked={enableLocation}
            onChange={(e, { checked }) =>
              setForm((state) => ({
                ...state,
                enableLocation: !!checked,
              }))
            }
            label={
              <label style={{ color: "white" }}>
                Enable current location and city.
              </label>
            }
          />
          {error?.message && (
            <Message negative>
              <p style={{ color: "red" }}>{error ? error.message : ""}</p>
            </Message>
          )}

          <div className="edit__pet__buttons">
            <Button
              type="submit"
              fluid
              style={{ color: "white", backgroundColor: COLORS.main }}
            >
              UPDATE PET
            </Button>
            <Button
              type="button"
              fluid
              style={{ color: "white", backgroundColor: COLORS.tertiary }}
              onClick={deletePetHandler}
            >
              DELETE PET
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPet;
