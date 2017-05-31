/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Platform
} = React;
// var DGT = require('./dgt/index.web.js');
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

class UIExplorerListBase extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
       
       
      }),
    };
  }

  componentDidMount(): void {
     this.setState({
      dataSource: ds.cloneWithRowsAndSections({
        components: [],
       
      }),
     
    });
  }

  render() {
  
    return (
      <View style={styles.listContainer}>
        
       
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          keyboardShouldPersistTaps={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
        />
      </View>
    );
  }

  
  



  renderRow(example: any, i: number) {
    return (
      <View key={i}>
      </View>
    );
  }

  

 

  
}

var styles = StyleSheet.create({
  listContainer: {
    height:1
  },
list: {
    backgroundColor: '#eeeeee',
  },
  
});

module.exports = UIExplorerListBase;
