import AssignUser from 'components/Task/Main/History/AssignUser';
import Attachments from 'components/Task/Main/History/Attachments';
import ChecklistAssign from 'components/Task/Main/History/CheckList/Assign';
import ItemChecklist from 'components/Task/Main/History/CheckList/Item';
import ChecklistTitle from 'components/Task/Main/History/CheckList/Title';
import CreateTask from 'components/Task/Main/History/CreateTask';
import DateTask from 'components/Task/Main/History/DateTask';
import Description from 'components/Task/Main/History/Description';
import Status from 'components/Task/Main/History/Status';
import TagHistory from 'components/Task/Main/History/Tag';
import Title from 'components/Task/Main/History/Title';
import { ru } from 'date-fns/locale';

export const DATE_FORMAT_HISTORY = 'dd MMM yyyy, HH:mm';

export const formatRelativeLocale = {
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: DATE_FORMAT_HISTORY,
  nextWeek: DATE_FORMAT_HISTORY,
  lastWeek: DATE_FORMAT_HISTORY,
  other: DATE_FORMAT_HISTORY,
};

export const locale = {
  ...ru,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export const HISTORY_COMMAND = {
  addTag: 'добавил(а) новые метки',
  unassignTag: 'удалил(а) метки',
  assignUser: 'добавил(а) новых участников ',
  unassignUser: 'удалил(а) участников',
  changeDate: 'изменил(а) срок задачи',
  changeStatus: 'сменил(а) статус задачи',
  createTask: 'создал(а) задачу',
  changeTitle: 'изменил(а) заголовок задачи',
  assignFile: 'добавил(а) вложения',
  unassignFile: 'удалил(а) вложение',
  changeDescription: 'изменил(а) описание',
  assignChecklist: 'добавил(а) чек-лист',
  unassignChecklist: 'удалил(а) чек-лист',
  сhangeTitleChecklist: 'изменил(а) название чек-листа',
  createItemChecklist: 'добавил(а) новый пункт в чек-лист',
  deleteItemChecklist: 'удалил(а) пункт в чек-листе',
  completeItemChecklist: 'отметил(а) пункты в чек-листе',
  changePriority: 'удалил(а) приоритет'
};

export const HISTORY = {
  taskCreate: 'task.create',
  statusChange: 'task.status_change',
  dateChange: 'task.exec_stop_change',
  roleAssign: 'task.role_assign',
  roleUnassign: 'task.role_un_assign',
  tagAssign: 'task.tag_assign',
  tagUnassign: 'task.tag_un_assign',
  titleChange: 'task.title_change',
  fileAssign: 'task.storage_file_assign',
  fileUnassign: 'task.storage_file_un_assign',
  descriptionChange: 'task.description_change',
  checklistAssign: 'task.check_list_assign',
  checklistUnassign: 'task.check_list_un_assign',
  titleChecklistChange: 'check_list.title_change',
  itemChecklistCreate: 'check_list.item_create',
  itemChecklistDelete: 'check_list.item_delete',
  itemChecklistComplete: 'check_list.item_change_complete',
  priorityChange: 'task.priority_change'
};

export const HISTORY_MAP = {
  'task.create': 'CreateTask',
  'task.status_change': 'Status',
  // 'task.exec_stop_change': DateTask,
  // 'task.role_assign': AssignUser,
  // 'task.role_un_assign': AssignUser,
  'task.tag_assign': 'TagHistory',
  'task.tag_un_assign': 'TagHistory',
  // 'task.title_change': Title,
  // 'task.storage_file_assign': Attachments,
  // 'task.storage_file_un_assign': Attachments,
  // 'task.description_change': Description,
  // 'task.check_list_assign': ChecklistAssign,
  // 'task.check_list_un_assign': ChecklistAssign,
  // 'check_list.title_change': ChecklistTitle,
  // 'check_list.item_create': ItemChecklist,
  // 'check_list.item_delete': ItemChecklist,
};
