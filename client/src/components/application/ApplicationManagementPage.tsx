import { Button, Modal, Form } from "react-bootstrap"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../authentication/features/authSlice"
import { useEffect, useState } from "react"
import User from "../user/User"
import { LinkContainer } from "react-router-bootstrap"
import { ApplicationType } from "../../types"
import Application from "./Application"

export default function ApplicationManagementPage() {
  const authSlice: any = useAppSelector(selectAuth)

  const [applications, setApplications] = useState<ApplicationType[]>([])
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [clickedApplication, setClickedApplication] = useState<
    ApplicationType | undefined
  >(undefined)

  //   const [userFetchError, setUserFetchError] = useState<boolean>(false)

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "degreeApplicationApplications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authSlice.token}`,
      } as HeadersInit,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setApplications(data)
        // setUserFetchError(false)
      })
      .catch((error) => {
        console.error(error)
        // setUserFetchError(true)
      })
  }, [])

  return (
    <div className="ApplicationManagementPage">
      <h2>Application-List</h2>
      {/* <Button
        id="UserManagementPageCreateUserButton"
        onClick={() => {
          setShowCreate(true)
        }}
      >
        Add User
      </Button>
      <Modal show={showCreate} id="UserManagementPageCreateComponent">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>userId:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditUserID"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>firstName:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditFirstName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>lastName:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditLastName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control
                  id="CreateUserComponentEditPassword"
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>is Administrator:</Form.Label>
                <Form.Switch
                  id="CreateUserComponentEditIsAdministrator"
                  type="checkbox"
                  placeholder=""
                />
              </Form.Group>
              <Button
                id="CreateUserComponentCreateUserButton"
                variant="primary"
                onClick={() => {
                  const userId = (
                    document.getElementById(
                      "CreateUserComponentEditUserID",
                    ) as HTMLInputElement
                  ).value
                  const firstName = (
                    document.getElementById(
                      "CreateUserComponentEditFirstName",
                    ) as HTMLInputElement
                  ).value
                  const lastName = (
                    document.getElementById(
                      "CreateUserComponentEditLastName",
                    ) as HTMLInputElement
                  ).value
                  const password = (
                    document.getElementById(
                      "CreateUserComponentEditPassword",
                    ) as HTMLInputElement
                  ).value
                  const isAdministrator =
                    (
                      document.getElementById(
                        "CreateUserComponentEditIsAdministrator",
                      ) as HTMLInputElement
                    )?.checked ?? false

                  //auslagern UserService
                  const createdUser: UserType = {
                    userID: userId,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    isAdministrator: isAdministrator,
                  }

                  fetch(import.meta.env.VITE_SERVER_URL + "users", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic " + authSlice.token,
                    },
                    body: JSON.stringify(createdUser),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("data:", data)
                      if ("userID" in data) setApplications([...users, data])
                      setShowCreate(false)
                    })
                }}
              >
                Create User
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowCreate(false)} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <Modal show={showEdit} id="UserManagementPageEditComponent">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              {`Edit User: ${clickedUser?.firstName} ${clickedUser?.lastName}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>userID:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditUserID"
                  type="text"
                  placeholder={clickedUser?.userID}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>firstName:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditFirstName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>lastName:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditLastName"
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control
                  id="EditUserComponentEditPassword"
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>is Administrator:</Form.Label>
                <Form.Switch
                  id="EditUserComponentEditIsAdministrator"
                  type="checkbox"
                  placeholder=""
                />
              </Form.Group>
              <Button
                id="EditUserComponentSaveUserButton"
                variant="primary"
                onClick={() => {
                  const firstName =
                    (
                      document.getElementById(
                        "EditUserComponentEditFirstName",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const lastName =
                    (
                      document.getElementById(
                        "EditUserComponentEditLastName",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const password =
                    (
                      document.getElementById(
                        "EditUserComponentEditPassword",
                      ) as HTMLInputElement
                    )?.value ?? ""
                  const isAdministrator =
                    (
                      document.getElementById(
                        "EditUserComponentEditIsAdministrator",
                      ) as HTMLInputElement
                    )?.checked ?? false

                  const editedUser: UserType = {}
                  if (firstName) editedUser.firstName = firstName
                  if (lastName) editedUser.lastName = lastName
                  if (password) editedUser.password = password
                  if (isAdministrator)
                    editedUser.isAdministrator = isAdministrator

                  const editedUserString = JSON.stringify(editedUser)

                  fetch(
                    import.meta.env.VITE_SERVER_URL +
                      "users/" +
                      clickedUser?.userID,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + authSlice.token,
                      },
                      body: editedUserString,
                    },
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      const newUsers = users.map((user) => {
                        if (user.userID === clickedUser?.userID) {
                          return { ...user, ...editedUser }
                        } else {
                          return user
                        }
                      }) as UserType[]
                      setApplications(newUsers)
                      setShowEdit(false)
                      console.log(data)
                    })
                }}
              >
                Edit User
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="OpenUserManagementPageListComponentButton"
              onClick={() => setShowEdit(false)}
              variant="secondary"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <Modal show={showDelete} id={`DeleteDialogUser${clickedUser?.userID}`}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              {`Delete User ${clickedUser?.firstName} ${clickedUser?.lastName}?`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{`Soll User ${clickedUser?.firstName} ${clickedUser?.lastName} gelöscht werden?`}</Modal.Body>
          <Modal.Footer>
            <Button
              id="DeleteDialogCancelButton"
              onClick={() => setShowDelete(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              id="DeleteDialogConfirmButton"
              onClick={() => {
                fetch(
                  import.meta.env.VITE_SERVER_URL +
                    "users/" +
                    clickedUser?.userID,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Basic " + authSlice.token,
                    },
                  },
                ).then((response) => {
                  const newUsers = users.filter(
                    (u: UserType) => u.userID !== clickedUser?.userID,
                  ) as UserType[]
                  setApplications(newUsers)
                  setShowDelete(false)
                })
              }}
              variant="primary"
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal> */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyleType: "none",
          padding: "0",
        }}
      >
        {applications.map((application: ApplicationType) => (
          <Application
            id={"UserItem" + application.id}
            application={application}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
            setClickedApplication={setClickedApplication}
          />
        ))}
      </ul>
      <LinkContainer to="/">
        <Button id="OpenStartPageButton">Start Page</Button>
      </LinkContainer>
    </div>
  )
}
