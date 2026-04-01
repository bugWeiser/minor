import React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[];
  rows: (React.ReactNode | string)[][];
  pagination?: React.ReactNode;
}

export function Table({
  className,
  headers,
  rows,
  pagination,
  ...props
}: TableProps) {
  return (
    <div className={cn("inline-block min-w-full overflow-hidden border-4 border-pencil bg-white rounded-md shadow-sketch rotate-[0.5deg]", className)}>
        <div className="-rotate-[0.5deg]">
          <table
            className="min-w-full border-collapse"
            {...props}
          >
            <thead>
              <tr className="bg-paper border-b-4 border-pencil border-dashed text-left">
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-5 font-sketch text-2xl font-black text-pencil uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b-2 border-pencil border-dashed last:border-0 hover:bg-paper/50 transition-colors"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 font-body text-base text-pencil leading-relaxed align-middle"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          {pagination && (
            <footer className="px-8 py-5 border-t-4 border-pencil border-dashed flex justify-end bg-paper">
               {pagination}
            </footer>
          )}
        </div>
    </div>
  );
}
