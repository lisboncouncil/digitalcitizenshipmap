
# Digital Citizenship Map

The project is built using Drupal 10 and ReactJS.

ReactJS manages the dynamic filter section in the homepage and it is rendered automatically using a Drupal Block.

## React Application

React section it is inside initiative-filter-react folder.

### Installation

- npm install

### Configuration in Development

Change the library dependency in Drupal 10 module 

/web/modules/custom/citimap/src/Plugin/Block/CitimapInitiativeFilterBlock.php




        'library' => array(
          'citimap/initiative-filter-react-dev',
        )


Start react development server
        
        npm Start

### Before to deploy to production

Update /web/modules/custom/citimap/src/Plugin/Block/CitimapInitiativeFilterBlock.php  removing dev


        'library' => array(
          'citimap/initiative-filter-react',
        )

Make a react build, the code will be automatically copied to Drupal module folder

        npm run build