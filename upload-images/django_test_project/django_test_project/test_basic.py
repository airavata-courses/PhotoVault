import datetime
import mock
import basic

test_app = basic.app
test_client = test_app.test_client()
test_app.testing = True


@mock.patch('dietapp.insertdb')
def test_insertdb(insertdb):
    response = test_client.get('upload/?URL=https://res.cloudinary.com/photovault/image/upload/v1552022798/vjznyfk7hv3j7oddb9jp.jpg&caption=rose&location=India&userId=5c81c8ebf785ea2ae8ea2f9a&isPublic=true')
    assert b'Record inserted' in response.data
