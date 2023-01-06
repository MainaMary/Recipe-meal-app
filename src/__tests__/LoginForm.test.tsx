import { render, screen } from "@testing-library/react";
import LoginForm from "../pages/login/LoginForm";
describe("<LoginForm/>", () => {
  test("Email input should be rendered", () => {
    render(<LoginForm />);
    const emailInputEl = screen.getByLabelText(/Email/i);
    expect(emailInputEl).toBeInTheDocument();
  });
});
