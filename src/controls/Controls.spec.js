import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each";
import Display from "../display/Display";
import Dashboard from "../dashboard/Dashboard";
import Controls from "./Controls";

describe("<Control />", () => {
  it("matches snapshot on initial page load", () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders button to close gate by default", () => {
    const { getByText } = render(<Controls />);
    getByText(/close gate/i);
  });

  it("renders button to lock gate by default", () => {
    const { getByText } = render(<Controls />);
    getByText(/lock gate/i);
  });
});

describe("Button functionality on Control", () => {
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
