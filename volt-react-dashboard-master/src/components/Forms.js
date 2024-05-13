import React, { useEffect, useReducer, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  FormSelect,
} from "@themesberg/react-bootstrap";
import { createNewShift } from "../services/ShiftService";
import { Field, Formik } from "formik";
import {
  addShiftCalendarSchema,
  myProfileSchema,
  shiftSchema,
} from "../schemas";
import FormikFieldDTPicker from "./FormikFieldDTPicker";
import { addShiftsToDepartment } from "../services/DepartmentService";
import { ChoosePhotoWidget } from "./Widgets";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>

        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthay</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const ShiftInfoForm = () => {
  const [startedTime, setStartedTime] = useState("");

  const [finishedTime, setFinishedTime] = useState("");

  let today = new Date(Date.now());

  /*---Validation Schema Code---*/

  const onSubmit = async (values) => {
    let response;

    try {
      console.log(values);
      response = await createNewShift(
        values.code,
        values.isOvernight,
        values.name,
        values.day,
        values.startedTime,
        values.finishedTime,
        values.clockInEarlyMinutes,
        values.clockInLateMinutes,
        values.clockOutEarlyMinutes,
        values.clockOutLateMinutes,
        values.totalWorkedHours
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
      console.log(e.data.message);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        {/* <h5 className="mb-4">Thêm ca làm việc</h5> */}

        <Formik
          onSubmit={onSubmit}
          validationSchema={shiftSchema}
          initialValues={{
            code: "",
            isOvernight: false,
            name: "",
            day: today.toISOString().split("T")[0],
            startedTime: startedTime,
            finishedTime: finishedTime,
            clockInEarlyMinutes: 0,
            clockInLateMinutes: 0,
            clockOutEarlyMinutes: 0,
            clockOutLateMinutes: 0,
            totalWorkedHours: 0,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="code"
                    controlId="validationFormikCode"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span> Mã
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="code"
                        value={values.code}
                        placeholder="Nhập mã phiên"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.code}
                        isValid={touched.code && !errors.code}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.code}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="name"
                    controlId="validationFormikName"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span> Tên
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder="Nhập tên phiên làm việc"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.name}
                        isValid={touched.name && !errors.name}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.name}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <Form.Group id="birthday">
                      <Form.Label>Birthday</Form.Label>
                      <Datetime
                        timeFormat={false}
                        onChange={setBirthday}
                        renderInput={(props, openCalendar) => (
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="text"
                              value={
                                birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                              }
                              placeholder="mm/dd/yyyy"
                              onFocus={openCalendar}
                              onChange={() => {}}
                            />
                          </InputGroup>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select defaultValue="0">
                        <option value="0">Gender</option>
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row> */}

              <Col md={12} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  id="time"
                  controlId="validationFormikTime"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Thời gian
                  </Form.Label>

                  <Col sm="10">
                    <InputGroup hasvalidation>
                      <Field
                        aria-describedby="inputGroupPrepend"
                        aria-label="startedTime"
                        name="startedTime"
                        value={values.startedTime}
                        onChange={handleChange}
                      >
                        {({ field }) => (
                          <div>
                            <Form.Control {...field} />
                          </div>
                        )}
                      </Field>

                      <Button disabled variant="primary" id="inputGroupPrepend">
                        Đến
                      </Button>

                      <Field
                        // aria-describedby="inputGroupPrepend"
                        className="px-3"
                        name="finishedTime"
                        aria-label="finishedTime"
                        value={values.finishedTime}
                        onChange={handleChange}
                      >
                        {({ field }) => (
                          <div>
                            <Form.Control {...field} />
                          </div>
                        )}
                      </Field>

                      {/* {touched.startedTime &&
                        touched.finishedTime &&
                        !errors.finishedTime &&
                        !errors.startedTime && (
                          <div className="valid-feedback">Hợp lệ.</div>
                        )}

                      {!!errors.startedTime && (
                        <div className="invalid-feedback">
                          {errors.startedTime}
                        </div>
                      )}

                      {!!errors.finishedTime && (
                        <div className="invalid-feedback">
                          {errors.finishedTime}
                        </div>
                      )} */}
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group as={Row} className="mb-3" id="code">
                  <Form.Label sm="2" column htmlFor="isOvernight">
                    Qua đêm
                  </Form.Label>
                  <Col>
                    <Form.Check
                      className="mt-2"
                      type="checkbox"
                      id="isOvernight"
                      name="isOvernight"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.isOvernight}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col md={10} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationFormikClockInEarly"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Vào sớm
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="clockInEarlyMinutes"
                        value={values.clockInEarlyMinutes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby="btn"
                        isInvalid={!!errors.clockInEarlyMinutes}
                        isValid={
                          touched.clockInEarlyMinutes &&
                          !errors.clockInEarlyMinutes
                        }
                      />
                      <Button disabled variant="primary" id="btn">
                        Phút
                      </Button>
                      <FormControl.Feedback type="invalid">
                        {errors.clockInEarlyMinutes}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={10} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationFormikClockInLate"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Vào trễ
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="clockInLateMinutes"
                        value={values.clockInLateMinutes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby="btn-01"
                        isInvalid={!!errors.clockInLateMinutes}
                        isValid={
                          touched.clockInLateMinutes &&
                          !errors.clockInLateMinutes
                        }
                      />
                      <Button disabled variant="primary" id="btn-01">
                        Phút
                      </Button>

                      <FormControl.Feedback type="invalid">
                        {errors.clockInLateMinutes}
                      </FormControl.Feedback>

                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={10} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="validationFormikClockOutEarly"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Về sớm
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="clockOutEarlyMinutes"
                        value={values.clockOutEarlyMinutes}
                        aria-describedby="btn-02"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.clockOutEarlyMinutes}
                        isValid={
                          touched.clockOutEarlyMinutes &&
                          !errors.clockOutEarlyMinutes
                        }
                      />
                      <Button disabled variant="primary" id="btn-02">
                        Phút
                      </Button>
                      <FormControl.Feedback type="invalid">
                        {errors.clockOutEarlyMinutes}
                      </FormControl.Feedback>

                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={10} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  id="code"
                  controlId="validationFormikClockOutLate"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Về trễ
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="clockOutLateMinutes"
                        value={values.clockOutLateMinutes}
                        aria-describedby="btn-03"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.clockOutLateMinutes}
                        isValid={
                          touched.clockOutLateMinutes &&
                          !errors.clockOutLateMinutes
                        }
                      />
                      <Button disabled variant="primary" id="btn-03">
                        Phút
                      </Button>
                      <FormControl.Feedback type="invalid">
                        {errors.clockOutLateMinutes}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={10} className="mb-3">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  id="totalWorkedHour"
                  controlId="validationFormikTotalWorkedHours"
                >
                  <Form.Label sm="2" column>
                    <span className="text-danger">*</span> Giờ công
                  </Form.Label>
                  <Col sm="10">
                    <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="totalWorkedHours"
                        value={values.totalWorkedHours}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby="btn-04"
                        isInvalid={!!errors.totalWorkedHours}
                        isValid={
                          touched.totalWorkedHours && !errors.totalWorkedHours
                        }
                      />
                      <Button disabled variant="primary" id="btn-04">
                        Giờ
                      </Button>
                      <FormControl.Feedback type="invalid">
                        {errors.totalWorkedHours}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </InputGroup>
                  </Col>
                </Form.Group>
              </Col>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Lưu lại
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export const EventCalendarForm = ({ data, name }) => {
  // const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  console.log(name);

  const onSubmit = (values) => {
    const startDayString = moment(values.startDay).format("yyyy-MM-DD");
    const finishDayString = moment(values.finishDay).format("yyyy-MM-DD");

    if (!moment(values.startDay).isBefore(moment(values.finishDay))) {
      setMessage("Ngày kết thúc phải sau ngày bắt đầu. Vui lòng thử lại");
    } else {
      try {
        let response = addShiftsToDepartment(
          name,
          values.shift,
          startDayString,
          finishDayString
        );
        console.log(response);
        // setData(response);
        window.location.reload();
      } catch (error) {
        setMessage(error.data);
      }
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Thêm ca làm việc</h5>

        <Formik
          onSubmit={onSubmit}
          initialValues={{
            shift: "Ca làm việc",
            startDay: "",
            finishDay: "",
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="shift">
                    <Form.Label>Chọn ca làm việc</Form.Label>

                    <Form.Select
                      name="shift"
                      value={values.shift}
                      defaultValue="null"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="Ca làm việc">Ca làm việc</option>
                      {data.map((el) => (
                        <option value={el}>{el}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <Form.Group id="start_day">
                    <Form.Label>Từ ngày</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>

                      <FormikFieldDTPicker name="startDay" />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group id="finish_day">
                    <Form.Label>Đến Ngày</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <FormikFieldDTPicker name="finishDay" />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              {message && <div className="text-danger">{message}</div>}

              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Thêm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export const MyProfileInfoForm = () => {
  // const [currentUser, setCurrentUser] = useState({});

  // Get current user from local storage
  let currentUser = AuthService.getCurrentUser();

  // useEffect(() => {
  //   console.log(user.email);
  //   setCurrentUser(user);
  // }, []);

  // console.log(`username = ${currentUser.username}`);
  // console.log(`email = ${currentUser.email}`);
  // console.log(`username = ${currentUser.username}`);
  // console.log(`username = ${currentUser.username}`);
  // useEffect(() => {
  //   setDefaultValues({
  //     email: user.email,
  //     username: user.username,
  //   });
  // }, [user]);

  const getRequestBody = (
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImage
  ) => {
    let requestBody = {};

    if (userId) {
      requestBody["userId"] = userId;
    }

    if (firstName) {
      requestBody["firstName"] = firstName.trim();
    }

    if (lastName) {
      requestBody["lastName"] = lastName.trim();
    }
    if (email) {
      requestBody["email"] = email.trim();
    }
    if (phoneNumber) {
      requestBody["phoneNumber"] = phoneNumber;
    }
    if (profileImage) {
      requestBody["profileImage"] = profileImage;
    }

    return requestBody;
  };

  const onSubmit = async (values) => {
    let response;
    console.log(values);

    const userProfileObj = getRequestBody(
      currentUser.id,
      values.firstName,
      values.lastName,
      values.email,
      values.phoneNumber,
      values.image
    );

    try {
      response = await UserService.updateUserByUserProfile(
        currentUser.id,
        userProfileObj
      );

      const updatedUser = response.data;

      console.log(`currentUser = ${currentUser}`);

      // Update for the "user" in localstorage
      const userObj = {};
      userObj["email"] = updatedUser.email;

      if (updatedUser.profileImage) {
        userObj["profileImage"] = updatedUser.profileImage;
      } else {
        userObj["profileImage"] = currentUser.profileImage;
      }

      userObj["username"] = updatedUser.username;
      userObj["id"] = currentUser.id;
      userObj["roles"] = currentUser.roles;
      userObj["token"] = currentUser.token;
      userObj["type"] = currentUser.type;

      localStorage.setItem("user", JSON.stringify(userObj));

      console.log(updatedUser);

      window.location.reload();
    } catch (e) {
      console.log(e);
      console.log(e.data.message);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            firstName: currentUser.username.trim(),
            lastName: "",
            email: currentUser.email,
            image: "",
            phoneNumber: "",
          }}
          validationSchema={myProfileSchema}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="firstName"
                    controlId="validationFormikFirstName"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span>
                      Tên
                    </Form.Label>

                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        placeholder="Vui lòng điền tên của bạn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.firstName}
                        isValid={touched.firstName && !errors.firstName}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.firstName}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="lastName"
                    controlId="validationFormikLastName"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span> Họ và tên đệm
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        placeholder="Vui lòng điền họ và tên đệm của bạn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lastName}
                        isValid={touched.lastName && !errors.lastName}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.lastName}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="email"
                    controlId="validationFormikEmail"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span>
                      Địa chỉ email:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="email"
                        value={values.email}
                        placeholder="Vui lòng điền địa chỉ gmail của bạn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // defaultValue={currentUser.email}
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.email}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    id="lastName"
                    controlId="validationFormikLastName"
                  >
                    <Form.Label sm="2" column>
                      <span className="text-danger">*</span> Số điện thoại
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        required
                        type="text"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        placeholder="Vui lòng nhập số điện thoại của bạn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.phoneNumber}
                        isValid={touched.phoneNumber && !errors.phoneNumber}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.phoneNumber}
                      </FormControl.Feedback>
                      <FormControl.Feedback type="valid">
                        Hợp lệ.
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <Form.Label sm="2">
                    <span className="text-danger">*</span> Chọn ảnh đại diện
                  </Form.Label>

                  <Col xs={12}>
                    <ChoosePhotoWidget
                      title="Chọn ảnh đại diện"
                      onImageSelected={setFieldValue}
                    />
                  </Col>
                </Col>
              </Row>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Lưu lại
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};
