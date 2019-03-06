import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each";
import Display from "./Display";

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

describe("Color functionality on Display", () => {
    it('displays green when gate is open', () => {
        const display = render(<Display closed={false}/>);
        const open= display.getByText(/open/i);
        expect(open).toHaveClass('led green-led');
    });

    it('displays red when gate is closed', () => {
        const display = render(<Display closed={true}/>);
        const closed = display.getByText(/closed/i);
        expect(closed).toHaveClass('led red-led');
    });

    it('displays green when gate is unlocked', () => {
        const display = render(<Display locked={false}/>);
        const unlocked= display.getByText(/unlocked/i);
        expect(unlocked).toHaveClass('led green-led');
    });

    it('displays red when gate is locked', () => {
        const display = render(<Display locked={true}/>);
        const locked = display.getByText(/locked/i);
        expect(locked).toHaveClass('led red-led');
    });

});
