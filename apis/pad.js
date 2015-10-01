const data = [
  {
    'title': 'Pad 1 title',
    'content': '# PadContent 1',
    'html': '<h1>PadContent 1</h1>',
    'user': 1,
    'cooperator': [],
    'tags': ['Tag'],
    'version': 0,
    'id': 1
  },
  {
    'title': 'Pad 2 title',
    'content': '# PadContent 2',
    'html': '<h1>PadContent 2</h1>',
    'user': 2,
    'cooperator': [1],
    'tags': ['Tag'],
    'version': 0,
    'id': 2
  },
  {
    'title': 'mdpad API',
    'content': "# A word for frontend developer\n\nThe `index.html` in frontend root folder is treated as a [go template](http://golang.org/pkg/text/template/#pkg-overview). The only variable you can use is *site root url*.\n\n# Basic knowledge\n\n### Parameters\nAPIs receive two kinds of parameter: URI or json.\n\n- URI parameter: passed as part of URI, like `/api/pad/1` in `/api/pad`. You have to pass URI parameters in correct order.\n- json parameter: passed in POST data.\n\nAPIs which has return data will always return in json format. Mostly with a boolean field named `result` which indicates operation result.\n\n### Image field in user data\nThis is raw url to the user's avatar.\n\n### Cooperate field in pad data\nThis is pad's cooperators (people who can edit this pad but not owner).\n\n# APIs\n\n### /api/logout - Logout\n\n- Entry: `/api/logout`\n\nLogout\n\n### /api/paths - Login provider\n\n- Entry: `/api/paths`\n- Return: passible login provider\n- Return type: `[\"string\"]`\n\nGet possible login method.\n\nScripts handling login process must first calling this API, then redirect user to `/auth/provider`. For example: if API returns [\"google\", \"fb\"], you might provide a dialog, let user choose one of them (say \"fb\" in this example), and redirect page to `/auth/fb`.\n\nAfter user login process is finished, user will be redirected back to index page, and you can call `/api/user`  to check if user is logged in.\n\n### /api/user - Get user info\n\n- Entry: `/api/user`\n- Return: User info object\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": {\"name\": \"string\", \"image\": \"string\", \"id\": integer}}`\n\nThis API will return current logged in user's data.\nYou have to check \"result\" first. if \"result\" is false, that means user has not logged in.\n\n### /api/users - Get all users info\n\n- Entry: `/api/users`\n- Return: Array of user info object\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": [{\"name\": \"string\", \"image\": \"string\", \"id\": integer}]}`\n\n### /api/pads - List all pads\n\n- Entry: `/api/pads`\n- Return: Array of pad info without content and html\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": [{\"title\": \"string\", \"user\": integer, \"cooperator\": [integer], \"tags\": [\"string\"], \"id\": integer}]}`\n\nThis api lists all pads without their content and html.\n\n### /api/pad - Get pad data\n\n- Entry: `/api/pad`\n- Parameters: padid (URI required)\n- Return: Array of pad info with content and html\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": {\"title\": \"string\", \"content\": \"string\", \"html\": \"string\", \"user\": integer, \"cooperator\": [integer], \"tags\": [\"string\"], \"version\": integer, \"id\": integer}}`\n\n### /api/edit - Edit pad\n\n- Entry: `/api/edit`\n- Parameters: padid (URI required), version (json required), title (json optional), content (json optional), cooperator (json optional), tags (json optional)\n- Return: result code\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": {\"code\": integer}}`\n\nResult code:\n- 0: Success.\n- 1: Not logged in.\n- 2: No such pad.\n- 3: Not cooperator.\n- 4: Failed to save pad.\n- 5: Version not match.\n\n`version` field keeps you from overwriting cooperator's work. Frontend calls `/api/pad` to get pad info, including a version number, then showing UI for user to edit their document. When calling this api to save user's work, you have to pass the version number in `version` field, and backend have to validate it, return fail if not match, so frontend can tell user \"Someone has updated this document just before you press SAVE button\".\n\n`tags` field is array of string.\n\nYou have to pass an array of cooperators' id as `cooperator` field. Use empty array to clear that field.\n\nOnly pad owner can edit `cooperate` field.\n\n### /api/create - Create new pad\n- Entry: `/api/create`\n- Parameters: title (json optional), content (json optional), cooperator (json optional), tags (json optional)\n- Return: result code\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": {\"code\": integer, \"id\": integer}}`\n\n`tags` field is array of string.\n\nYou have to pass an array of cooperators' id as `cooperator` field. Use empty array to clear that field.\n\nResult code:\n- 0: Success, pad id is return via `id` field.\n- 1: Not logged in.\n- 2: Failed to save into database.\n\n### /api/delete - Delete pad\n- Entry: `/api/delete`\n- Parameters: padid (URI required)\n- Return: result code\n- Return type: `{\"result\": boolean, \"message\": \"string\", \"data\": {\"code\": integer}}`\n\nResult code:\n- 0: Success.\n- 1: Not logged in.\n- 2: No such pad.\n- 3: Not owner.\n- 4: Unknown error.\n",
    'html': "<h1>A word for frontend developer</h1>\n\n<p>The <code class=\"prettyprint \">index.html</code> in frontend root folder is treated as a <a href=\"http://golang.org/pkg/text/template/#pkg-overview\">go template</a>. The only variable you can use is <em>site root url</em>.</p>\n\n<h1>Basic knowledge</h1>\n\n<h3>Parameters</h3>\n\n<p>APIs receive two kinds of parameter: URI or json.</p>\n\n<ul>\n<li>URI parameter: passed as part of URI, like <code class=\"prettyprint \">/api/pad/1</code> in <code class=\"prettyprint \">/api/pad</code>. You have to pass URI parameters in correct order.<br></li>\n<li>json parameter: passed in POST data.<br></li>\n</ul>\n\n<p>APIs which has return data will always return in json format. Mostly with a boolean field named <code class=\"prettyprint \">result</code> which indicates operation result.</p>\n\n<h3>Image field in user data</h3>\n\n<p>This is raw url to the user&rsquo;s avatar.</p>\n\n<h3>Cooperate field in pad data</h3>\n\n<p>This is pad&rsquo;s cooperators (people who can edit this pad but not owner).</p>\n\n<h1>APIs</h1>\n\n<h3>/api/logout - Logout</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/logout</code><br></li>\n</ul>\n\n<p>Logout</p>\n\n<h3>/api/paths - Login provider</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/paths</code><br></li>\n<li>Return: passible login provider<br></li>\n<li>Return type: <code class=\"prettyprint \">[&quot;string&quot;]</code><br></li>\n</ul>\n\n<p>Get possible login method.</p>\n\n<p>Scripts handling login process must first calling this API, then redirect user to <code class=\"prettyprint \">/auth/provider</code>. For example: if API returns [&ldquo;google&rdquo;, &ldquo;fb&rdquo;], you might provide a dialog, let user choose one of them (say &ldquo;fb&rdquo; in this example), and redirect page to <code class=\"prettyprint \">/auth/fb</code>.</p>\n\n<p>After user login process is finished, user will be redirected back to index page, and you can call <code class=\"prettyprint \">/api/user</code>  to check if user is logged in.</p>\n\n<h3>/api/user - Get user info</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/user</code><br></li>\n<li>Return: User info object<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: {&quot;name&quot;: &quot;string&quot;, &quot;image&quot;: &quot;string&quot;, &quot;id&quot;: integer}}</code><br></li>\n</ul>\n\n<p>This API will return current logged in user&rsquo;s data.<br>\nYou have to check &ldquo;result&rdquo; first. if &ldquo;result&rdquo; is false, that means user has not logged in.</p>\n\n<h3>/api/users - Get all users info</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/users</code><br></li>\n<li>Return: Array of user info object<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: [{&quot;name&quot;: &quot;string&quot;, &quot;image&quot;: &quot;string&quot;, &quot;id&quot;: integer}]}</code><br></li>\n</ul>\n\n<h3>/api/pads - List all pads</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/pads</code><br></li>\n<li>Return: Array of pad info without content and html<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: [{&quot;title&quot;: &quot;string&quot;, &quot;user&quot;: integer, &quot;cooperator&quot;: [integer], &quot;tags&quot;: [&quot;string&quot;], &quot;id&quot;: integer}]}</code><br></li>\n</ul>\n\n<p>This api lists all pads without their content and html.</p>\n\n<h3>/api/pad - Get pad data</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/pad</code><br></li>\n<li>Parameters: padid (URI required)<br></li>\n<li>Return: Array of pad info with content and html<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: {&quot;title&quot;: &quot;string&quot;, &quot;content&quot;: &quot;string&quot;, &quot;html&quot;: &quot;string&quot;, &quot;user&quot;: integer, &quot;cooperator&quot;: [integer], &quot;tags&quot;: [&quot;string&quot;], &quot;version&quot;: integer, &quot;id&quot;: integer}}</code><br></li>\n</ul>\n\n<h3>/api/edit - Edit pad</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/edit</code><br></li>\n<li>Parameters: padid (URI required), version (json required), title (json optional), content (json optional), cooperator (json optional), tags (json optional)<br></li>\n<li>Return: result code<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: {&quot;code&quot;: integer}}</code><br></li>\n</ul>\n\n<p>Result code:<br>\n- 0: Success.<br>\n- 1: Not logged in.<br>\n- 2: No such pad.<br>\n- 3: Not cooperator.<br>\n- 4: Failed to save pad.<br>\n- 5: Version not match.</p>\n\n<p><code class=\"prettyprint \">version</code> field keeps you from overwriting cooperator&rsquo;s work. Frontend calls <code class=\"prettyprint \">/api/pad</code> to get pad info, including a version number, then showing UI for user to edit their document. When calling this api to save user&rsquo;s work, you have to pass the version number in <code class=\"prettyprint \">version</code> field, and backend have to validate it, return fail if not match, so frontend can tell user &ldquo;Someone has updated this document just before you press SAVE button&rdquo;.</p>\n\n<p><code class=\"prettyprint \">tags</code> field is array of string.</p>\n\n<p>You have to pass an array of cooperators&rsquo; id as <code class=\"prettyprint \">cooperator</code> field. Use empty array to clear that field.</p>\n\n<p>Only pad owner can edit <code class=\"prettyprint \">cooperate</code> field.</p>\n\n<h3>/api/create - Create new pad</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/create</code><br></li>\n<li>Parameters: title (json optional), content (json optional), cooperator (json optional), tags (json optional)<br></li>\n<li>Return: result code<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: {&quot;code&quot;: integer, &quot;id&quot;: integer}}</code><br></li>\n</ul>\n\n<p><code class=\"prettyprint \">tags</code> field is array of string.</p>\n\n<p>You have to pass an array of cooperators&rsquo; id as <code class=\"prettyprint \">cooperator</code> field. Use empty array to clear that field.</p>\n\n<p>Result code:<br>\n- 0: Success, pad id is return via <code class=\"prettyprint \">id</code> field.<br>\n- 1: Not logged in.<br>\n- 2: Failed to save into database.</p>\n\n<h3>/api/delete - Delete pad</h3>\n\n<ul>\n<li>Entry: <code class=\"prettyprint \">/api/delete</code><br></li>\n<li>Parameters: padid (URI required)<br></li>\n<li>Return: result code<br></li>\n<li>Return type: <code class=\"prettyprint \">{&quot;result&quot;: boolean, &quot;message&quot;: &quot;string&quot;, &quot;data&quot;: {&quot;code&quot;: integer}}</code><br></li>\n</ul>\n\n<p>Result code:<br>\n- 0: Success.<br>\n- 1: Not logged in.<br>\n- 2: No such pad.<br>\n- 3: Not owner.<br>\n- 4: Unknown error.</p>\n",
    'user': 3,
    'cooperator': [1, 2],
    'tags': ['Tag', 'Another'],
    'version': 0,
    'id': 3
  }
]

module.exports = (padId) => {
  const isValid = (4 > padId > 0);
  const ret = {
    'result': isValid,
    'message': (isValid) ? '' : 'Cannot load pad#0 from database.',
  }
  if (isValid) ret.data = data[padId - 1];

  return ret;
};
