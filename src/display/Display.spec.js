import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each";
import Display from "./Display";
import Dashboard from "../dashboard/Dashboard";
import Controls from "../controls/Controls";

describe("<Display />", () => {
  it("matches snapshot on initial page load", () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("<Display />", () => {
  it("gate is open by default", () => {
    const { getByText } = render(<Display />);
    getByText(/open/i);
  });
  it("gate is unlocked by default", () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i);
  });
});

describe("Button functionality on Display", () => {

  it("display closed when closed button clicked", () => {
    render(<Dashboard />);
    const controls = render(<Controls />);
    const closeBtn = controls.getByText(/close gate/i);
    const display = render(<Display />);
    const closed = display.getByText(/open/i);
    fireEvent.click(closeBtn);
    expect(closed).toHaveTextContent(/closed/i);
  });

  it("display open when open button clicked", () => {
    render(<Dashboard />);
    const controls = render(<Controls />);
    const closeBtn = controls.getByText(/close gate/i);
    const display = render(<Display />);
    const open = display.getByText(/open/i);
    fireEvent.click(closeBtn);
    fireEvent.click(closeBtn);
    expect(open).toHaveTextContent(/open/i);
  });

  it("displays locked when lock button is clicked", () => {
    render(<Dashboard />);
    const controls = render(<Controls />);
    const closeBtn = controls.getByText(/close gate/i);
    const lockBtn = controls.getByText(/lock gate/i);
    const display = render(<Display />);
    const locked = display.getByText(/unlocked/i);
    fireEvent.click(closeBtn);
    fireEvent.click(lockBtn);
    expect(locked).toHaveTextContent(/locked/i);
  });

  it("displays unlocked when unlock button is clicked", () => {
    render(<Dashboard />);
    const controls = render(<Controls />);
    const closeBtn = controls.getByText(/close gate/i);
    const lockBtn = controls.getByText(/lock gate/i);
    const display = render(<Display />);
    const unlocked = display.getByText(/unlocked/i);
    fireEvent.click(closeBtn);
    fireEvent.click(lockBtn);
    fireEvent.click(lockBtn);
    expect(unlocked).toHaveTextContent(/unlocked/i);
  });

});
