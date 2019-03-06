import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import "react-testing-library/cleanup-after-each";
import Display from '../display/Display'
import Dashboard from "./Dashboard";
import Controls from "../controls/Controls";

describe("<Dashboard />", () => {
    it("matches snapshot on initial page load", () => {
      const tree = renderer.create(<Dashboard />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('cannot lock gate without closing gate first', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const lockBtn = component.getByText(/lock gate/i);

        fireEvent.click(lockBtn);

        expect(lockBtn).toHaveTextContent(/lock gate/i);
    });

    it('can lock gate after closing', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openBtn= component.getByText(/close gate/i);
        const lockBtn = component.getByText(/lock gate/i);

        fireEvent.click(openBtn);
        fireEvent.click(lockBtn);

        expect(lockBtn).toHaveTextContent(/unlock gate/i);
    });

    it('can unlock gate after locking', () => {
        render(<Dashboard/>);
        const component = render(<Controls/>);
        const openBtn = component.getByText(/close gate/i);
        const lockBtn = component.getByText(/lock gate/i);

        fireEvent.click(openBtn);
        fireEvent.click(lockBtn);
        fireEvent.click(lockBtn);

        expect(lockBtn).toHaveTextContent(/lock gate/i);
    });

  });