import React from "react";
import { useNavigate } from "react-router-dom";
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
import { GENDERS, PETS_CATEGORIES } from "../../../constants";
import { useGeolocation } from "../../../hooks";
import { ErrorType, StateType } from "../../../types";
import "./NewPet.css";
import { useSelector } from "react-redux";
interface Props {}

const NewPet: React.FC<Props> = () => {
  const { coords } = useGeolocation();
  const { user } = useSelector((state: StateType) => state);
  const navigator = useNavigate();

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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      age,
      price,
      description,
      gender,
      category,
      enableLocation,
      image,
    });
  };
  return (
    <div className="new__pet">
      <Header />
      <div className="new__pet__form">
        <h1>ADD NEW PET TO MARKET</h1>
        <Form
          // loading={fetching}
          className={"new__pet__form"}
          onSubmit={onSubmit}
        >
          <Input
            fluid
            className={"new__pet__form__input"}
            iconPosition="left"
            type={"text"}
            onChange={onChange}
            placeholder="Pet Name"
            icon={<Icon name="at" />}
            key={"name"}
            value={name}
            name="name"
            error={error?.field === "name"}
          />
          <Input
            fluid
            className={"login__form__input"}
            iconPosition="left"
            type={"number"}
            onChange={onChange}
            placeholder="Pet Age (in weeks)"
            icon={<Icon name="at" />}
            key={"age"}
            value={age}
            name="age"
            error={error?.field === "age"}
          />
          <Input
            fluid
            className={"new__pet__form__input"}
            iconPosition="left"
            type={"number"}
            onChange={onChange}
            placeholder="Pet Price"
            icon={<Icon name="at" />}
            key={"price"}
            value={price}
            name="price"
            error={error?.field === "price"}
          />
          <TextArea
            placeholder="Tell us more about your pet"
            fluid
            className={"new__pet__form__input"}
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
            className={"new__pet__form__input"}
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
            className={"new__pet__form__input"}
            fluid
            placeholder="Select Pet Category"
            options={PETS_CATEGORIES.map((category) => ({
              key: category,
              value: category,
              text: category,
            }))}
            value={category}
            onChange={(e, { value }) =>
              setForm((state) => ({ ...state, category: value as string }))
            }
          />

          <FileUploader
            handleChange={(file: any) => {
              setForm((state) => ({ ...state, image: file }));
            }}
            name="file"
            types={["jpeg", "png", "jpg", "webp", "gif"]}
            className="new__pet__form__dragzone new__pet__form__input"
          />
          <Checkbox
            className={"new__pet__form__input"}
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

          <Button
            color="green"
            type="submit"
            fluid
            className="new__pet__create__btn"
          >
            ADD PET TO MARKET
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewPet;
