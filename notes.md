# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |   home.jsx                 |  none                 |    none          |
| Register new user<br/>(t@jwt.com, pw: test)         |   login.jsx                 |    [POST] /api/auth               |   INSERT INTO user (name, email, password)VALUES (?, ?, ?) INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?) |
| Login new user<br/>(t@jwt.com, pw: test)            |    login.jsx                |      [PUT] /api/auth             |  INSERT INTO auth (token, userId) VALUES (?, ?)           |
| Order pizza                                         |      menu.jsx              |        [POST] /api/order          |              | INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now())
INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?)
| Verify pizza                                        |   delivery.jsx                 |         [POST] /api/order/verify          |     SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}
SELECT id, menuId, description, price FROM orderItem WHERE orderId=?
         |
| View profile page                                   |     dinerDashboard.jsx               |      [GET] /api/order            |      SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}
SELECT id, menuId, description, price FROM orderItem WHERE orderId=?        |
| View franchise<br/>(as diner)                       |     franchiseDashboard.jsx               |     [GET] /api/franchise/3              |   SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?
SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})           |
| Logout                                              |       logout.jsx             |   [DELETE] /api/auth                |   DELETE FROM auth WHERE token=?           |
| View About page                                     |   about.jsx                 |        none           |     none         |
| View History page                                   |     history.jsx               |       none            |    none          |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |      franchiseDashboard.jsx              |     [PUT] /api/auth
[GET] /api/franchise/2              |   INSERT INTO auth (token, userId) VALUES (?, ?)
SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?
SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})           |
| View franchise<br/>(as franchisee)                  |    franchiseDashboard.jsx                |     [GET] /api/franchise/2               |   SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?
SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})            |
| Create a store                                      |        createStore.jsx            |    [POST] /api/franchise/1/store [GET] /api/franchise/2               |     INSERT INTO store (franchiseId, name) VALUES (?, ?)
SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?
SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})         |
| Close a store                                       |      closeStore.jsx              |      [DELETE] /api/franchise/1/store/1             |     DELETE FROM store WHERE franchiseId=? AND id=?         |
| Login as admin<br/>(a@jwt.com, pw: admin)           |    login.jsx                |     [PUT] /api/auth           |    INSERT INTO auth (token, userId) VALUES (?, ?)          |
| View Admin page                                     |     adminDashboard.jsx               |    [GET] /api/franchise               |    SELECT id, name FROM franchise
SELECT id, name FROM store WHERE franchiseId=?          |
| Create a franchise for t@jwt.com                    |     createFranchise.jsx               |     [POST] /api/franchise              |   SELECT id, name FROM user WHERE email=?
INSERT INTO franchise (name) VALUES (?)
INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)           |
| Close the franchise for t@jwt.com                   |   closeFranchise.jsx                 |     [DELETE] /api/franchise/3              |    DELETE FROM store WHERE franchiseId=?
DELETE FROM userRole WHERE objectId=?
DELETE FROM franchise WHERE id=?          |
