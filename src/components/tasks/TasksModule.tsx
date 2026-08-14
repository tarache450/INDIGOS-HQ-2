import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Task } from '../../types';
import {
  CheckSquare,
  Plus,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Filter,
  Calendar
} from 'lucide-react';

interface TasksModuleProps {
  onOpenQuickCreate: () => void;
}

const TASK_STATUSES: { id: Task['status']; label: string; color: string }[] = [
  { id: 'TODO', label: 'To Do', color: 'border-indigo-500/40 text-indigo-300' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'border-amber-500/40 text-amber-300' },
  { id: 'WAITING', label: 'Waiting / Blocked', color: 'border-rose-500/40 text-rose-300' },
  { id: 'DONE', label: 'Completed', color: 'border-emerald-500/40 text-emerald-300' }
];

export const TasksModule: React.FC<TasksModuleProps> = ({ onOpenQuickCreate }) => {
  const { tasks, updateTask } = useData();
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    await updateTask(taskId, { status: newStatus });
  };

  const filteredTasks = tasks.filter(
    t => filterPriority === 'ALL' || t.priority === filterPriority
  );

  return (
    <div id="tasks-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Operations & Task Management
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Operational deadlines, DSP delivery milestones, mastering check-offs, and team responsibilities.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">New Task</span>
        </button>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center space-x-1.5 bg-[#121215] border border-[#27272A] p-2.5 rounded-lg">
        <span className="text-[10px] font-mono text-zinc-400">Filter Priority:</span>
        {['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'].map(p => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              filterPriority === p
                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Kanban Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {TASK_STATUSES.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col space-y-2.5"
            >
              <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                <span className={`text-[11px] font-mono font-semibold uppercase ${col.color}`}>
                  {col.label}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#18181B] text-zinc-300 border border-[#27272A]">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[260px]">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 rounded-md bg-[#18181B] border border-[#27272A] space-y-2 shadow-xs hover:border-[#3F3F46] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[9px] font-mono font-medium uppercase px-1.5 py-0.2 rounded ${
                          task.priority === 'URGENT'
                            ? 'bg-rose-950/70 text-rose-300 border border-rose-500/30'
                            : task.priority === 'HIGH'
                            ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{task.deadline}</span>
                      </span>
                    </div>

                    <h4 className="text-xs font-medium text-zinc-100">{task.title}</h4>
                    {task.description && (
                      <p className="text-[10px] text-zinc-400 line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex items-center justify-between pt-1.5 border-t border-[#27272A] text-[9px] font-mono">
                      <span className="text-indigo-300 flex items-center space-x-1">
                        <User className="w-2.5 h-2.5" />
                        <span>{task.assignedTo || 'Unassigned'}</span>
                      </span>

                      {/* Status switcher */}
                      <select
                        value={task.status}
                        onChange={e => handleStatusChange(task.id, e.target.value as any)}
                        className="bg-[#121215] border border-[#27272A] rounded px-1 py-0.5 text-[9px] text-zinc-300 focus:outline-none"
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="WAITING">Waiting</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
