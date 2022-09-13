const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const Post = require('../../model/Post');
const User = require('../../model/User');
const config = require('config');
const request = require('request');
const { check, validationResult } = require('express-validator');
// using express routes
const router = express.Router();

// @route  GET api/profile/me
// @desc   Test route
// @access Public

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(404).json({
        msg: 'Oops! No user found.',
      });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  POST api/profile/
// @desc   Create profile for a user
// @access Private
router.post('/', [
  auth,
  [
    check('status', 'Status is reqiured').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      githubusername,
      skills,
      status,
      youtube,
      social,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills
        .split(',')
        .map((skill) => skill.trim());
    }
    //  Build social object

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.is });
      if (profile) {
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
      //
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  },
]);

// @route  GET api/profile/
// @desc   Get all profiles
// @access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});
// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile)
      return res.status(404).json({
        msg: 'The profile not found',
      });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  Delete api/profile/
// @desc   delete profile , user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo - delete user posts
    // await Post.findByIdAndRemove({})
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Account deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  update api/profile/experience
// @desc   add profile experience
// @access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company title is required').not().isEmpty(),
      check('from', 'From data is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { company, title, from, to, location, current, description } =
      req.body;
    const newexperience = {
      company,
      title,
      from,
      to,
      location,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newexperience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  }
);

// @route  delete api/profile/experience
// @desc   delete profile experience
// @access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get index
    const indexOfExpToRemove = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);
    //remove index, by? 1
    profile.experience.splice(indexOfExpToRemove, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  update api/profile/education
// @desc   add profile education
// @access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School name is required').not().isEmpty(),
      check('degree', 'Degree title is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
      check('location', 'location of school is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      location,
    } = req.body;
    const newEducation = {
      school,
      degree,
      from,
      to,
      fieldofstudy,
      current,
      description,
      location,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error :(');
    }
  }
);

// @route  delete api/profile/education
// @desc   delete profile education
// @access Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get index
    const indexOfEduToRemove = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.edu_id);
    //remove index, by? 1
    profile.education.splice(indexOfEduToRemove, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

// @route  GET api/profile/github/:username
// @desc   get user profile profile
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username
        }/repos?per_page=6&sort=created:asc&client_id=${config.get(
          'githubClientID'
        )}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res
          .status(400)
          .json({ msg: 'No such Github user found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error :(');
  }
});

module.exports = router;
