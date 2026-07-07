export default function Table({ columns, data }) {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map(col => (

              <th
                key={col.key}
                className="text-left px-6 py-4 text-slate-700"
              >
                {col.label}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >

              {columns.map(col => (

                <td
                  key={col.key}
                  className="px-6 py-4 text-slate-700"
                >

                  {row[col.key]}

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}