
# Digital Citizenship Map

The project is built using Drupal 10 and ReactJS.

ReactJS manages the dynamic filter section in the homepage and it is rendered automatically using a Drupal Block.

## React Application

React code is inside the folder *initiative-filter-react* folder.

### Installation

- cd initiative-filter-react
- npm install

### Configuration in Development

1. Change the library dependency in Drupal 10 module. 
This will allow to render in Drupal the development build instead of the final build

*/web/modules/custom/citimap/src/Plugin/Block/CitimapInitiativeFilterBlock.php*


You have to replace *initiative-filter-react* to *initiative-filter-react-dev*

        'library' => array(
          'citimap/initiative-filter-react-dev',
        )


2. Start react development server
        
        npm start

### Deploy a new build to production

Before to do any git push you have to build the react application locally.

1.       npm run build

2. Update /web/modules/custom/citimap/src/Plugin/Block/CitimapInitiativeFilterBlock.php  removing dev from the library dependency

        'library' => array(
          'citimap/initiative-filter-react',
        )

## Drupal 10

### Compiling SCSS libraries

The project uses SCSS libraries. To compile the SCSS files you have to run the following command:

        cd web/themes/custom/citimap01
        npm run build
        drush cr
