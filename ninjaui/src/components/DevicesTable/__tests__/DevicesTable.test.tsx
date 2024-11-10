import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import React, { Suspense } from "react";
import { DevicesTable } from "../DevicesTable";
import Jest from 'jest';
import { Device } from "../../../core/queries/useGetDevices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock('axios', () => ({
    get: jest.fn()
}));

const defaultDevices: Device[] = [
    {
        hdd_capacity: '10',
        id: 'id',
        system_name: 'foo machine',
        type: 'LINUX'
    },
    {
        hdd_capacity: '10',
        id: 'id',
        system_name: 'foo bar',
        type: 'MAC'
    },
    {
        hdd_capacity: '10',
        id: 'id',
        system_name: 'bat bee',
        type: 'MAC'
    },
];

const queryClient = new QueryClient();

const renderView = () => {
    render(
        <QueryClientProvider client={queryClient}>
            <DevicesTable setDeviceMeta={jest.fn()} />
        </QueryClientProvider >
    );
};

describe('DevicesTable', () => {
    it('should display devices when get devices call finishes', async () => {
        (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: defaultDevices });

        renderView();

        expect(await screen.findByText('foo machine-id')).toBeInTheDocument();
    });

    it('should filter by text', async () => {
        (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: defaultDevices });

        renderView();

        fireEvent.change(await screen.findByPlaceholderText('Search'), { target: { value: 'zz' } });
        expect(screen.queryByText('foo machine-id')).not.toBeInTheDocument();
    });

    it('should filter by type', async () => {
        (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: defaultDevices });

        renderView();

        fireEvent.change(await screen.findByTestId('device-select'), { target: { value: 'MAC' } });

        expect(screen.queryByText('foo machine-id')).not.toBeInTheDocument();
        expect(screen.getByText('foo bar-id')).toBeInTheDocument();
    });

    it('should handle multiple filters', async () => {
        (axios.get as jest.MockedFunction<any>).mockResolvedValue({ data: defaultDevices });

        renderView();

        fireEvent.change(await screen.findByTestId('device-select'), { target: { value: 'MAC' } });

        expect(screen.queryByText('foo machine-id')).not.toBeInTheDocument();
        expect(screen.getByText('foo bar-id')).toBeInTheDocument();

        fireEvent.change(await screen.findByPlaceholderText('Search'), { target: { value: 'foo' } });

        expect(screen.getByText('foo bar-id')).toBeInTheDocument();
        expect(screen.queryByText('bat bee-id')).not.toBeInTheDocument();
    });
});