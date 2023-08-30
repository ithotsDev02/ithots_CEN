import { combineReducers } from "redux";
import { readMessageReducer } from "./message/reducers";
import { readNotificationReducer } from "./notification/reducers";
import authReducer from "./authentication/reducers";
import CategoryReducer from "./categories/reducers";
import ChangeLayoutMode from "./themeLayout/reducers";
import TutorReducer from "./tutor/reducers";
import { userReducer } from "./users/reducers";
import { headerSearchReducer } from "./headerSearch/reducers";
import SAdminReducer from "./sadmin/reducer";
import StudentReducer from "./student/reducers";
import CoursesReducer from "./course/reducers";
import cartReducer from "./cart/reducer";
const rootReducers = combineReducers({
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  users: userReducer,
  auth: authReducer,
  categories: CategoryReducer,
  tutors: TutorReducer,
  sadmin: SAdminReducer,
  student: StudentReducer,
  course: CoursesReducer,
  ChangeLayoutMode,
  cart: cartReducer,
});

export default rootReducers;
