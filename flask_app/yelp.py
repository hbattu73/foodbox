import requests
from urllib.parse import quote

# Define the API Key
API_KEY = 'bwmMq3TuCvZevn0DvewuPw3DNqumQK_MTxROvFyqJPqaDUyYRNWtvcx0lLWPnRNUHavUctvcJA07NsLTHyt8DaChaSlfGzUnTfFi3TuMWEXdad7C2NlAQK8ILgBZX3Yx'

# Define the API Host              
API_HOST = 'https://api.yelp.com'
# Basic business information path
SEARCH_PATH = '/v3/businesses/search'
# Detailed business information path                             
BUSINESS_ID_PATH = '/v3/businesses/{id}'

# Define the Header
HEADERS = {'Authorization' : 'bearer %s' % API_KEY}


def create_endpoint(host, path, business_id = None):
    if business_id:
        path = path.format(id = business_id)
    
    endpoint = '{host}{path}'.format(host = host, path = quote(path.encode('utf8')))
    return endpoint


def request(host, path, business_id = None, parameters = None):
    endpoint = create_endpoint(host, path, business_id)
    print('Querying {endpoint}... '.format(endpoint = endpoint))
    response = requests.get(url = endpoint, params = parameters, headers = HEADERS)
    
    return response.json()

def create_dict(term, limit, location, sort_by):
    params = {'term' : term,
              'limit' : limit,  
              'location': location,
              'sort_by' : sort_by
             }
    return params

def get_details(business_id):
    detailed_data = request(API_HOST, BUSINESS_ID_PATH, business_id)
    return detailed_data


def query(term, limit, location, sort_by='best_match'):
    params = create_dict(term, limit, location, sort_by)
    business_data = request(API_HOST, SEARCH_PATH, parameters = params)

    if not business_data:
        print('No businesses found within 25 miles of your location. Try different paramaters.')
        return
    
    print('{total} businesses found!'.format(total = business_data['total']))
    detailed_data = []
    for business in business_data['businesses']:
        business_id = business['id']
        detailed_data.append(get_details(business_id))

    for business in detailed_data:
        print('Name: {name} , id: {id}'.format(name = business["name"], id = business["id"]))
    return detailed_data



