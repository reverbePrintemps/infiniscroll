import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Image } from "../../components/Image";
import { Photo } from "../../hooks/api";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const mockImage: Photo = {
  id: 1,
  urls: {
    small: "small_image_url",
    regular: "regular_image_url",
    raw: "raw_image_url",
  },
  description: "Test image",
  user: {
    name: "John Doe",
    username: "johndoe",
  },
  width: 100,
  height: 100,
  color: "blue",
};

describe("Image component", () => {
  test("renders without errors", () => {
    render(
      <Image
        image={mockImage}
        onClick={jest.fn()}
        favorite={false}
        style={{}}
      />
    );

    const imageElement = screen.getByAltText(mockImage.description as string);
    expect(imageElement).toBeInTheDocument();
  });

  test("toggles description on click", () => {
    render(
      <Image
        image={mockImage}
        onClick={jest.fn()}
        favorite={false}
        style={{}}
      />
    );

    const descriptionContainer = screen.getByTestId(
      "image-description-container"
    );
    fireEvent.click(descriptionContainer);

    expect(descriptionContainer).toMatchSnapshot();

    fireEvent.click(descriptionContainer);

    expect(descriptionContainer).toMatchSnapshot();
  });

  test("displays favorite icon when favorite prop is true", () => {
    render(
      <Image image={mockImage} onClick={jest.fn()} favorite={true} style={{}} />
    );

    const favoriteIcon = screen.getByTestId("FavoriteIcon");
    expect(favoriteIcon).toBeInTheDocument();
  });

  test("displays skeleton when image is not loaded", () => {
    render(
      <Image
        image={mockImage}
        onClick={jest.fn()}
        favorite={false}
        style={{}}
      />
    );

    const skeletonElement = screen.getByTestId("image-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });

  test("displays loaded image when image is loaded", () => {
    render(
      <Image
        image={mockImage}
        onClick={jest.fn()}
        favorite={false}
        style={{}}
      />
    );

    const imageElement = screen.getByAltText(mockImage.description as string);
    fireEvent.load(imageElement);

    expect(imageElement).toBeInTheDocument();
  });
});
