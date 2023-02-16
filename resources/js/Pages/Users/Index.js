import React, { useEffect, useState, useCallback } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import { debounce, pickBy } from "lodash";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const { data: people, meta, filtered, attributes } = props.users;
    const [params, setParams] = useState(filtered)
    const [pageNumber, setPageNumber] = useState([])

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('users.index'),
                pickBy(query),
                {
                    preserveState:true
                }
            )
        }, 150)
        ,
      [],
    );

    useEffect(() => reload(params), [params]);

    useEffect(() => {
        let numbers = [];
        for(let i = attributes.per_page; i <= meta.total / attributes.per_page; i = i +attributes.per_page){
            numbers.push(i)
        }
        setPageNumber(numbers);
    }, [])

    const onChange = (event) => setParams({...params, [event.target.name]: event.target.value})

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end">
                    <div className="w-1/2">
                        <select id="load" name="load" onChange={onChange} value={params.load} className="form-select">
                            {pageNumber.map((page, index) => <option key={index}>{page}</option> )}
                        </select>
                    </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    #
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Username
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Address
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Joined
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {people.map((person, index) => (
                                                <tr
                                                    key={person.id}
                                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {meta.from + index}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {person.name}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {person.username}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {person.email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {person.address}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {person.joined}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="flex items-center gap-x-1 mt-10">
                        {meta.links.map((item, index) => (
                            <Link
                                disabled={item.url == null ? true : false}
                                as="button"
                                className={`${item.url == null ? 'text-gray-500 cursor-default' : 'text-gray-800'} w-12 h-8 rounded-lg flex items-center justify-center border bg-white`}
                                href={item.url || ""}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                />
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </Authenticated>
    );
}
