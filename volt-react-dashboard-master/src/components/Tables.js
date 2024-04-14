import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
  Modal,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import checkInLogs from "../data/checkInLogs";
import commands from "../data/commands";

import {
  listCheckInLogWithPage,
  listCheckInLogWithParamsPage,
  deleteCheckInLogById,
} from "../services/CheckInLogService";

import { useSyncExternalStore } from "react";
import { listShiftsPage } from "../services/ShiftService";
import { ShiftInfoForm } from "./Forms";
import { listDepartmentsPage } from "../services/DepartmentService";
import UserService from "../services/user.service";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate, dueDate, status } =
      props;

    const statusVariant =
      status === "Paid"
        ? "success"
        : status === "Due"
        ? "warning"
        : status === "Canceled"
        ? "danger"
        : "primary";

    return (
      <tr>
        <td>
          {/* <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link> */}
        </td>
        <td>
          <span className="fw-normal">{subscription}</span>
        </td>
        <td>
          <span className="fw-normal">{issueDate}</span>
        </td>
        <td>
          <span className="fw-normal">{dueDate}</span>
        </td>
        <td>
          <span className="fw-normal">${parseFloat(price).toFixed(2)}</span>
        </td>
        <td>
          <span className="fw-normal"> {status}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Bill For</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Due Date</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const CheckInLogTable = ({ searchTitle, size }) => {
  // Datas and Index
  const [datas, setDatas] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Handle Pageable
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["personName"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveDatas = () => {
    const params = getRequestParams(searchTitle, page, size);

    listCheckInLogWithParamsPage(params)
      .then((res) => {
        const { checkinlogs, totalPages, totalItems } = res.data;

        setDatas(checkinlogs);
        setCount(totalPages);
        setTotalItems(totalItems);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveDatas, [page, size, searchTitle]);

  useEffect(() => {
    setPage(1);
    setCurrentIndex(1);
  }, [searchTitle]);

  // const refreshList = () => {
  //   retrieveDatas();
  //   setCurrentData(null);
  //   setCurrentIndex(-1);
  // };

  // const setActiveData = (data, index) => {
  //   setCurrentData(data);
  //   setCurrentIndex(index);
  // };

  /*Missing removeAll() function*/

  const handlePageChange = (numPage) => {
    setCurrentIndex(numPage);

    setPage(numPage);
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= count; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentIndex}
          as="button"
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();

    const minutes = "0" + date.getMinutes();

    const seconds = "0" + date.getSeconds();

    // const formattedTime =
    //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    const formattedTime =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    return formattedTime;
  };

  const convertTimeStampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();

    const minutes = "0" + date.getMinutes();

    const seconds = "0" + date.getSeconds();

    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  const TableRow = (prop) => {
    const {
      cameraId,
      date,
      id,
      image,
      insertedTime,
      mask,
      msgId,
      personId,
      personName,
      personType,
      time,
    } = prop;

    const [showDetail, setshowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDetail = () => {
      setshowDetail(true);
    };

    const handleShowDelete = () => {
      setShowDelete(true);
    };

    const handleDelete = (id) => {
      deleteCheckInLogById(id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{personName}</span>
        </td>
        <td>
          <span className="fw-normal">{personId}</span>
        </td>
        <td>
          <span className="media d-flex align-items-center">
            <Image src={image} className="img-circle hor" />
          </span>
        </td>
        <td>
          <span className="fw-normal">{convertTimestampToDate(date)}</span>
        </td>
        <td>
          <span className="fw-normal">{convertTimeStampToTime(date)}</span>
        </td>
        <td>
          <span className="fw-normal">{personType}</span>
        </td>

        {/* The Action column */}
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu as={ButtonGroup}>
              <Dropdown.Item as={Button} onClick={() => handleShowDetail()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Modal
                as={Modal.Dialog}
                centered
                show={showDetail}
                fullscreen={true}
                onHide={() => setshowDetail(false)}
              >
                <Modal.Header>
                  <Modal.Title className="h6">
                    Thông tin của nhân viên {personName ? personName : "Noname"}{" "}
                    với ID: {id}
                  </Modal.Title>
                  <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setshowDetail(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Camera ID: {cameraId}</p>
                  <p>Date: {date}</p>
                  <p>Id: {id}</p>
                  <p>
                    Image
                    <Image src={image} />
                  </p>
                  <p>Inserted Time: {insertedTime}</p>
                  <p>Mask: {mask === 0 ? "Không" : "Có"}</p>
                  <p>Message ID: {msgId}</p>
                  <p>Person ID: {personId}</p>
                  <p>Person Name: {personName}</p>
                  <p>Person Type: {personType}</p>
                  <p>Time: {convertTimeStampToTime(time)}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setshowDetail(false)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => setshowDetail(false)}
                  >
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal>

              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>

              <Dropdown.Item
                className="text-danger"
                as={Button}
                onClick={() => handleShowDelete()}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDelete}
                onHide={() => setShowDelete(false)}
              >
                <Modal.Header onClick={() => setShowDelete(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Cảnh báo
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Bạn có chắc chắn muốn xóa dữ liệu này không ?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowDelete(false)}>Trở lại</Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={handleDelete(id)}
                  >
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Tên nhân viên</th>
              <th className="border-bottom">#Person ID</th>
              <th className="border-bottom">Hình ảnh</th>
              <th className="border-bottom">Ngày</th>
              <th className="border-bottom">Thời điểm check in</th>
              <th className="border-bottom">Person Type</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return <TableRow key={`checkInLogs-${data.id}`} {...data} />;
            })}
            {/* {checkInLogs.map((checkInLog) => {
              return (
                <TableRow
                  key={`checkInLogs-${checkInLog.id}`}
                  {...checkInLog}
                />
              );
            })} */}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="mb-2 mb-lg-0"
              page={page}
              // onChange={handleChangePages}
              count={count}
            >
              <Pagination.Prev id="prev" onClick={handlePrev}>
                Previous
              </Pagination.Prev>
              {renderPaginationItems()}
              <Pagination.Next id="next" onClick={handleNext}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{size}</b> out of <b>{totalItems}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const ShiftTable = ({ searchTitle, size }) => {
  // Datas and Index
  const [datas, setDatas] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Hanle Pageable
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(true);
  };

  const TableRow = (props) => {
    const {
      id,
      code,
      isOvernight,
      name,
      day,
      startedTime,
      finishedTime,
      earlyMinutes,
      lateMinutes,
      totalWorkedHours,
    } = props;

    const [showDetail, setshowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDetail = () => {
      setshowDetail(true);
    };

    const handleShowDelete = () => {
      setShowDelete(true);
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{code}</span>
        </td>
        <td>
          <span className="fw-normal">{isOvernight}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{day}</span>
        </td>
        <td>
          <span className="fw-normal">{startedTime}</span>
        </td>
        <td>
          <span className="fw-normal">{finishedTime}</span>
        </td>
        <td>
          <span className="fw-normal">{earlyMinutes} phút</span>
        </td>
        <td>
          <span className="fw-normal">{lateMinutes} phút</span>
        </td>
        <td>
          <span className="fw-normal">{totalWorkedHours} giờ</span>
        </td>

        {/* The Action column */}
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu as={ButtonGroup}>
              <Dropdown.Item as={Button} onClick={() => handleShowDetail()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              {/* <Modal
                as={Modal.Dialog}
                centered
                show={showDetail}
                fullscreen={true}
                onHide={() => setshowDetail(false)}
              >
                <Modal.Header>
                  <Modal.Title className="h6">
                    Thông tin của nhân viên {personName ? personName : "Noname"}{" "}
                    với ID: {id}
                  </Modal.Title>
                  <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setshowDetail(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Camera ID: {cameraId}</p>
                  <p>Date: {date}</p>
                  <p>Id: {id}</p>
                  <p>
                    Image
                    <Image src={image} />
                  </p>
                  <p>Inserted Time: {insertedTime}</p>
                  <p>Mask: {mask === 0 ? "Không" : "Có"}</p>
                  <p>Message ID: {msgId}</p>
                  <p>Person ID: {personId}</p>
                  <p>Person Name: {personName}</p>
                  <p>Person Type: {personType}</p>
                  <p>Time: {convertTimeStampToTime(time)}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setshowDetail(false)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => setshowDetail(false)}
                  >
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal> */}

              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>

              <Dropdown.Item
                className="text-danger"
                as={Button}
                onClick={() => handleShowDelete()}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
              {/* 
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDelete}
                onHide={() => setShowDelete(false)}
              >
                <Modal.Header onClick={() => setShowDelete(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Cảnh báo
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Bạn có chắc chắn muốn xóa dữ liệu này không ?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowDelete(false)}>Trở lại</Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={handleDelte(id)}
                  >
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["name"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrieveDatas = () => {
    const params = getRequestParams(searchTitle, page, size);

    listShiftsPage(params)
      .then((res) => {
        const { shifts, totalPages, totalItems } = res.data;

        setDatas(shifts);
        setCount(totalPages);
        setTotalItems(totalItems);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveDatas, [page, size, searchTitle]);

  useEffect(() => {
    setPage(1);
    setCurrentIndex(1);
  }, [searchTitle]);

  const refreshList = () => {
    retrieveDatas();
    setCurrentData(null);
    setCurrentIndex(-1);
  };

  const setActiveData = (data, index) => {
    setCurrentData(data);
    setCurrentIndex(index);
  };

  /*Missing removeAll() function*/

  const handlePageChange = (numPage) => {
    setCurrentIndex(numPage);

    setPage(numPage);
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= count; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentIndex}
          as="button"
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const convertTimestampToDate = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   // const formattedTime =
  //   //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  //   const formattedTime =
  //     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  //   return formattedTime;
  // };

  // const convertTimeStampToTime = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   const formattedTime =
  //     hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //   return formattedTime;
  // };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Button variant="info" className="mb-3 mt-3" onClick={handleshow}>
          <span>
            <FontAwesomeIcon icon={faPlus} className="" /> Thêm phiên
          </span>
        </Button>

        <Modal show={show} size="lg" onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm ca làm việc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ShiftInfoForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Đóng
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Mã</th>
              <th className="border-bottom">Qua đêm</th>
              <th className="border-bottom">Tên phiên</th>
              <th className="border-bottom">Ngày làm việc</th>
              <th className="border-bottom">Bắt đầu</th>
              <th className="border-bottom">Kết thúc</th>
              <th className="border-bottom">Về sớm</th>
              <th className="border-bottom">Vào trễ</th>
              {/* <th className="border-bottom">Về sớm</th>
              <th className="border-bottom">Về trễ</th> */}
              <th className="border-bottom">Giờ công</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return <TableRow key={`checkInLogs-${data.id}`} {...data} />;
            })}
            {/* {checkInLogs.map((checkInLog) => {
              return (
                <TableRow
                  key={`checkInLogs-${checkInLog.id}`}
                  {...checkInLog}
                />
              );
            })} */}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="mb-2 mb-lg-0"
              page={page}
              // onChange={handleChangePages}
              count={count}
            >
              <Pagination.Prev id="prev" onClick={handlePrev}>
                Previous
              </Pagination.Prev>
              {renderPaginationItems()}
              <Pagination.Next id="next" onClick={handleNext}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{size}</b> out of <b>{totalItems}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const OrganizeStructureTable = () => {
  // Datas and Index
  const [datas, setDatas] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Hanle Pageable
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(true);
  };

  const TableRow = (props) => {
    const { image, employeeId, departmentName, name, employeeCode } = props;

    const [showDetail, setshowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDetail = () => {
      setshowDetail(true);
    };

    const handleShowDelete = () => {
      setShowDelete(true);
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {employeeId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{employeeCode}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>

        <td>
          <span className="media d-flex align-items-center">
            <Image src={image} className="img-circle hor" />
          </span>
        </td>
        <td>
          <span className="fw-normal">unknown</span>
        </td>
        <td>
          <span className="fw-normal">{departmentName}</span>
        </td>

        {/* The Action column */}
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu as={ButtonGroup}>
              <Dropdown.Item as={Button} onClick={() => handleShowDetail()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              {/* <Modal
                as={Modal.Dialog}
                centered
                show={showDetail}
                fullscreen={true}
                onHide={() => setshowDetail(false)}
              >
                <Modal.Header>
                  <Modal.Title className="h6">
                    Thông tin của nhân viên {personName ? personName : "Noname"}{" "}
                    với ID: {id}
                  </Modal.Title>
                  <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setshowDetail(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Camera ID: {cameraId}</p>
                  <p>Date: {date}</p>
                  <p>Id: {id}</p>
                  <p>
                    Image
                    <Image src={image} />
                  </p>
                  <p>Inserted Time: {insertedTime}</p>
                  <p>Mask: {mask === 0 ? "Không" : "Có"}</p>
                  <p>Message ID: {msgId}</p>
                  <p>Person ID: {personId}</p>
                  <p>Person Name: {personName}</p>
                  <p>Person Type: {personType}</p>
                  <p>Time: {convertTimeStampToTime(time)}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setshowDetail(false)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => setshowDetail(false)}
                  >
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal> */}

              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>

              <Dropdown.Item
                className="text-danger"
                as={Button}
                onClick={() => handleShowDelete()}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
              {/* 
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDelete}
                onHide={() => setShowDelete(false)}
              >
                <Modal.Header onClick={() => setShowDelete(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Cảnh báo
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Bạn có chắc chắn muốn xóa dữ liệu này không ?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowDelete(false)}>Trở lại</Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={handleDelte(id)}
                  >
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const getRequestParams = (page) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const retrieveDatas = () => {
    const params = getRequestParams(page);

    UserService.getEmployeesByJobTitlePage(params)
      .then((res) => {
        const { employees, totalPages, totalItems } = res.data;

        setDatas(employees);
        setCount(totalPages);
        setTotalItems(totalItems);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveDatas, [page]);

  const refreshList = () => {
    retrieveDatas();
    setCurrentData(null);
    setCurrentIndex(-1);
  };

  const setActiveData = (data, index) => {
    setCurrentData(data);
    setCurrentIndex(index);
  };

  /*Missing removeAll() function*/

  const handlePageChange = (numPage) => {
    setCurrentIndex(numPage);

    setPage(numPage);
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= count; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentIndex}
          as="button"
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const convertTimestampToDate = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   // const formattedTime =
  //   //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  //   const formattedTime =
  //     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  //   return formattedTime;
  // };

  // const convertTimeStampToTime = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   const formattedTime =
  //     hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //   return formattedTime;
  // };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Mã Nhân Viên</th>
              <th className="border-bottom">Tên</th>
              <th className="border-bottom">Hình ảnh</th>
              <th className="border-bottom">Ngày bắt đầu làm việc</th>
              <th className="border-bottom">Phòng Ban</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return <TableRow key={`employee-${data.id}`} {...data} />;
            })}
            {/* {checkInLogs.map((checkInLog) => {
              return (
                <TableRow
                  key={`checkInLogs-${checkInLog.id}`}
                  {...checkInLog}
                />
              );
            })} */}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="mb-2 mb-lg-0"
              page={page}
              // onChange={handleChangePages}
              count={count}
            >
              <Pagination.Prev id="prev" onClick={handlePrev}>
                Previous
              </Pagination.Prev>
              {renderPaginationItems()}
              <Pagination.Next id="next" onClick={handleNext}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const GeneralWorkingShiftTable = ({ searchTitle, size }) => {
  // Datas and Index
  const [datas, setDatas] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Hanle Pageable
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(true);
  };

  const TableRow = (props) => {
    const {
      id,
      code,
      isOvernight,
      name,
      day,
      startedTime,
      finishedTime,
      earlyMinutes,
      lateMinutes,
      totalWorkedHours,
    } = props;

    const [showDetail, setshowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDetail = () => {
      setshowDetail(true);
    };

    const handleShowDelete = () => {
      setShowDelete(true);
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{code}</span>
        </td>
        <td>
          <span className="fw-normal">{isOvernight}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{day}</span>
        </td>
        <td>
          <span className="fw-normal">{startedTime}</span>
        </td>
        <td>
          <span className="fw-normal">{finishedTime}</span>
        </td>
        <td>
          <span className="fw-normal">{earlyMinutes} phút</span>
        </td>
        <td>
          <span className="fw-normal">{lateMinutes} phút</span>
        </td>
        <td>
          <span className="fw-normal">{totalWorkedHours} giờ</span>
        </td>

        {/* The Action column */}
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu as={ButtonGroup}>
              <Dropdown.Item as={Button} onClick={() => handleShowDetail()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              {/* <Modal
                as={Modal.Dialog}
                centered
                show={showDetail}
                fullscreen={true}
                onHide={() => setshowDetail(false)}
              >
                <Modal.Header>
                  <Modal.Title className="h6">
                    Thông tin của nhân viên {personName ? personName : "Noname"}{" "}
                    với ID: {id}
                  </Modal.Title>
                  <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setshowDetail(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Camera ID: {cameraId}</p>
                  <p>Date: {date}</p>
                  <p>Id: {id}</p>
                  <p>
                    Image
                    <Image src={image} />
                  </p>
                  <p>Inserted Time: {insertedTime}</p>
                  <p>Mask: {mask === 0 ? "Không" : "Có"}</p>
                  <p>Message ID: {msgId}</p>
                  <p>Person ID: {personId}</p>
                  <p>Person Name: {personName}</p>
                  <p>Person Type: {personType}</p>
                  <p>Time: {convertTimeStampToTime(time)}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setshowDetail(false)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => setshowDetail(false)}
                  >
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal> */}

              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>

              <Dropdown.Item
                className="text-danger"
                as={Button}
                onClick={() => handleShowDelete()}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
              {/* 
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDelete}
                onHide={() => setShowDelete(false)}
              >
                <Modal.Header onClick={() => setShowDelete(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Cảnh báo
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Bạn có chắc chắn muốn xóa dữ liệu này không ?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowDelete(false)}>Trở lại</Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={handleDelte(id)}
                  >
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["name"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrieveDatas = () => {
    const params = getRequestParams(searchTitle, page, size);

    listShiftsPage(params)
      .then((res) => {
        const { shifts, totalPages, totalItems } = res.data;

        setDatas(shifts);
        setCount(totalPages);
        setTotalItems(totalItems);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(retrieveDatas, [page, size, searchTitle]);

  useEffect(() => {
    setPage(1);
    setCurrentIndex(1);
  }, [searchTitle]);

  const refreshList = () => {
    retrieveDatas();
    setCurrentData(null);
    setCurrentIndex(-1);
  };

  const setActiveData = (data, index) => {
    setCurrentData(data);
    setCurrentIndex(index);
  };

  /*Missing removeAll() function*/

  const handlePageChange = (numPage) => {
    setCurrentIndex(numPage);

    setPage(numPage);
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= count; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentIndex}
          as="button"
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const convertTimestampToDate = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   // const formattedTime =
  //   //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  //   const formattedTime =
  //     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  //   return formattedTime;
  // };

  // const convertTimeStampToTime = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   const formattedTime =
  //     hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //   return formattedTime;
  // };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Mã Nhân Viên</th>
              <th className="border-bottom">Hình ảnh</th>
              <th className="border-bottom">Họ và tên</th>
              <th className="border-bottom">Phòng ban</th>
              <th className="border-bottom">Tổng giờ công</th>
              <th className="border-bottom">Số lần đi trễ</th>
              <th className="border-bottom">Số lần về sớm</th>
              <th className="border-bottom">Không chấm công</th>
              <th className="border-bottom">Nghỉ phép</th>
              <th className="border-bottom">Nghỉ không lương</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return <TableRow key={`checkInLogs-${data.id}`} {...data} />;
            })}
            {/* {checkInLogs.map((checkInLog) => {
              return (
                <TableRow
                  key={`checkInLogs-${checkInLog.id}`}
                  {...checkInLog}
                />
              );
            })} */}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="mb-2 mb-lg-0"
              page={page}
              // onChange={handleChangePages}
              count={count}
            >
              <Pagination.Prev id="prev" onClick={handlePrev}>
                Previous
              </Pagination.Prev>
              {renderPaginationItems()}
              <Pagination.Next id="next" onClick={handleNext}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{size}</b> out of <b>{totalItems}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const DepartmentTable = ({ searchTitle, size }) => {
  // Datas and Index
  const [datas, setDatas] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Hanle Pageable
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [show, setShow] = useState(false);

  const handleshow = () => {
    setShow(true);
  };

  const TableRow = (props) => {
    const { id, name, location } = props;

    const [showDetail, setshowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowDetail = () => {
      setshowDetail(true);
    };

    const handleShowDelete = () => {
      setShowDelete(true);
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{location}</span>
        </td>

        {/* The Action column */}
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu as={ButtonGroup}>
              <Dropdown.Item as={Button} onClick={() => handleShowDetail()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              {/* <Modal
                as={Modal.Dialog}
                centered
                show={showDetail}
                fullscreen={true}
                onHide={() => setshowDetail(false)}
              >
                <Modal.Header>
                  <Modal.Title className="h6">
                    Thông tin của nhân viên {personName ? personName : "Noname"}{" "}
                    với ID: {id}
                  </Modal.Title>
                  <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setshowDetail(false)}
                  />
                </Modal.Header>
                <Modal.Body>
                  <p>Camera ID: {cameraId}</p>
                  <p>Date: {date}</p>
                  <p>Id: {id}</p>
                  <p>
                    Image
                    <Image src={image} />
                  </p>
                  <p>Inserted Time: {insertedTime}</p>
                  <p>Mask: {mask === 0 ? "Không" : "Có"}</p>
                  <p>Message ID: {msgId}</p>
                  <p>Person ID: {personId}</p>
                  <p>Person Name: {personName}</p>
                  <p>Person Type: {personType}</p>
                  <p>Time: {convertTimeStampToTime(time)}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setshowDetail(false)}
                  >
                    OK
                  </Button>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => setshowDetail(false)}
                  >
                    Đóng
                  </Button>
                </Modal.Footer>
              </Modal> */}

              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>

              <Dropdown.Item
                className="text-danger"
                as={Button}
                onClick={() => handleShowDelete()}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
              {/* 
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDelete}
                onHide={() => setShowDelete(false)}
              >
                <Modal.Header onClick={() => setShowDelete(false)}>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Cảnh báo
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Bạn có chắc chắn muốn xóa dữ liệu này không ?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowDelete(false)}>Trở lại</Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={handleDelte(id)}
                  >
                    Xóa
                  </Button>
                </Modal.Footer>
              </Modal> */}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["name"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const retrieveDatas = () => {
    const params = getRequestParams(searchTitle, page, size);

    listDepartmentsPage(params)
      .then((res) => {
        const { departments, totalPages, totalItems } = res.data;

        setDatas(departments);
        setCount(totalPages);
        setTotalItems(totalItems);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveDatas, [page, size, searchTitle]);

  useEffect(() => {
    setPage(1);
    setCurrentIndex(1);
  }, [searchTitle]);

  const refreshList = () => {
    retrieveDatas();
    setCurrentData(null);
    setCurrentIndex(-1);
  };

  const setActiveData = (data, index) => {
    setCurrentData(data);
    setCurrentIndex(index);
  };

  /*Missing removeAll() function*/

  const handlePageChange = (numPage) => {
    setCurrentIndex(numPage);

    setPage(numPage);
  };

  const renderPaginationItems = () => {
    let items = [];

    for (let number = 1; number <= count; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentIndex}
          as="button"
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      setPage(page + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const convertTimestampToDate = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   // const formattedTime =
  //   //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  //   const formattedTime =
  //     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  //   return formattedTime;
  // };

  // const convertTimeStampToTime = (timestamp) => {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getHours();

  //   const minutes = "0" + date.getMinutes();

  //   const seconds = "0" + date.getSeconds();

  //   const formattedTime =
  //     hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //   return formattedTime;
  // };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Tên phòng ban</th>
              <th className="border-bottom">Vị trí</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => {
              return <TableRow key={`checkInLogs-${data.id}`} {...data} />;
            })}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="mb-2 mb-lg-0"
              page={page}
              // onChange={handleChangePages}
              count={count}
            >
              <Pagination.Prev id="prev" onClick={handlePrev}>
                Previous
              </Pagination.Prev>
              {renderPaginationItems()}
              <Pagination.Next id="next" onClick={handleNext}>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{size}</b> out of <b>{totalItems}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
